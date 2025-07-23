import jwt from "jsonwebtoken";
import config from "../config/index.js";

const { NODE_ENV, JWT_SECRET, JWT_REFRESH_SECRET } = config;

// Generate access token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Generate refresh token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Set tokens in HTTP-only cookies
export const setTokenCookies = (res, accessToken, refreshToken) => {
  // Set access token cookie
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Clear cookies (for logout)
export const clearTokenCookies = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
