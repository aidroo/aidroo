// import { SignJWT, jwtVerify } from "jose";

// const JWT_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET);

// export async function generateToken(userId) {
//   console.log(userId);
//   const jwt = await new SignJWT({ userId })
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime(Math.floor(Date.now() / 1000) + 60 * 60 * 24)
//     .sign(JWT_SECRET);

//   return jwt;
// }

// export async function verifyToken(token) {
//   if (!JWT_SECRET) {
//     console.error("JWT_SECRET is not defined");
//     return null;
//   }
//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);
//     return payload;
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return null;
//   }
// }
import { SignJWT, jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET);

// Generate Access Token
export async function generateAccessToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h") // 15 minutes
    .sign(ACCESS_SECRET);
}

// Generate Refresh Token
export async function generateRefreshToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // 7 days
    .sign(REFRESH_SECRET);
}

// Verify Access Token
export async function verifyAccessToken(token) {
  const { payload } = await jwtVerify(token, ACCESS_SECRET);
  return payload;
}

// Verify Refresh Token
export async function verifyRefreshToken(token) {
  const { payload } = await jwtVerify(token, REFRESH_SECRET);
  return payload;
}
