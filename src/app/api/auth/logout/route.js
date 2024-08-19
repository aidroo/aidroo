// import connectToDatabase from "@/config/db/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Create the response object
//     const response = NextResponse.json({
//       status: 200,
//       message: "User logged out successfully",
//     });

//     // Clear the token cookie
//     response.cookies.delete("token");

//     return response;
//   } catch (error) {
//     return NextResponse.json({
//       error: error.message || "Internal Server Error",
//       status: error.status || 500,
//     });
//   }
// }
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    status: 200,
    message: "Logged out successfully",
  });

  // Clear the tokens
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
