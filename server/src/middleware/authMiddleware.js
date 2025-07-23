import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import config from "../config/index.js";

const { JWT_SECRET } = config;
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for access token in cookies
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from the token (exclude password)
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
