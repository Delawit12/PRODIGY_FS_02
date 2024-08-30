import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secret.js";
import prisma from "../config/prisma.js";

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      id?: string;
      role?: string;
    }
  }
}
const auth: any = async (req: Request, res: Response, next: NextFunction) => {
  // Check if the authorization header is present and starts with "Bearer"
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(404).json({
      success: false,
      message: "Token not found or invalid",
    });
  }
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as any; // ! used for non null assertion when we sure the value is non null-able

    req.id = payload.userId;

    req.role = payload.role;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;
