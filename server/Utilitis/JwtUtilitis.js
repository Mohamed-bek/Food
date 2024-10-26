import { serialize } from "cookie";

// Set a cookie with the token
export const setTokenCookie = (res, token) => {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day expiration
    path: "/", // Cookie available throughout the app
  });

  res.setHeader("Set-Cookie", cookie);
};

// Clear the token cookie (for logout)
export const clearTokenCookie = (res) => {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1, // Expire immediately
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};
