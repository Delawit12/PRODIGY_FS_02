import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized. No user ID found in request.",
      });
    }

    const userId = parseInt(req.id as string, 10); //parse the id to number

    if (isNaN(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User ID.",
      });
    }

    // get the user by their id
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    // check the role is ADMIN
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        status: "fail",
        message:
          "Forbidden. You do not have permission to access this resource.",
      });
    }

    //    if it is , go to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
