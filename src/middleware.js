import { NextResponse } from "next/server";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./utils/jwt";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Redirect if the URL contains any uppercase letters
  if (/[A-Z]/.test(path)) {
    const lowercasedUrl = request.nextUrl.clone();
    lowercasedUrl.pathname = path.toLowerCase();
    return NextResponse.redirect(lowercasedUrl);
  }
  // Define public paths
  const isPublicPath =
    path === "/login" ||
    path.startsWith("/signup/business") ||
    path.startsWith("/signup/personal");

  // Retrieve tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const refreshToken = request.cookies.get("refreshToken")?.value || "";

  let decodedToken = null;

  if (accessToken) {
    try {
      // Verify the access token
      decodedToken = await verifyAccessToken(accessToken);
    } catch (error) {
      console.log("Access token expired or invalid:", error);
    }
  }

  if (!decodedToken && refreshToken) {
    try {
      // If the access token is expired/invalid but refresh token exists, verify it
      const decodedRefreshToken = await verifyRefreshToken(refreshToken);

      if (decodedRefreshToken) {
        // Generate new access and refresh tokens
        const newAccessToken = await generateAccessToken({
          username: decodedRefreshToken.username,
          role: decodedRefreshToken.role,
        });
        const newRefreshToken = await generateRefreshToken({
          username: decodedRefreshToken.username,
          role: decodedRefreshToken.role,
        });

        // Update the response with new tokens in cookies
        const response = NextResponse.next();

        // Set new access token
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 15, // 15 minutes
          path: "/",
        });

        // Set new refresh token
        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });

        // Continue with the new access token
        decodedToken = await verifyAccessToken(newAccessToken);

        return response;
      }
    } catch (error) {
      console.log("Refresh token expired or invalid:", error);
    }
  }

  // If the user is authenticated
  if (decodedToken) {
    const userRole = decodedToken.role;
    // console.log("peros", userRole);
    // Prevent business users from accessing personal_dashboard and vice versa

    // Prevent logged-in users from accessing login/signup pages
    if (isPublicPath) {
      // Redirect based on user role
      if (userRole === "business") {
        return NextResponse.redirect(
          new URL("/business_dashboard", request.nextUrl)
        );
      }
      if (userRole === "personal") {
        return NextResponse.redirect(
          new URL("/personal_dashboard", request.nextUrl)
        );
      }

      // Default redirect for other roles
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // Otherwise, allow them to continue to the protected page
    return NextResponse.next();
  }

  // If the user is not authenticated and accessing a protected path, redirect to login
  if (!isPublicPath && !decodedToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // For public paths (login/signup) where the user is not logged in, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/business_dashboard/:path*",
    "/personal_dashboard/:path*",
    "/login",
    "/signup/business/:path*", // Protect signup business
    "/signup/personal/:path*", // Protect signup personal
  ],
};
