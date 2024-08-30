import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
const userController = {
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the userId from the token
      const userId = parseInt(req.id as string, 10);

      // accept inputs from the req.body
      const { currentPassword, newPassword } = req.body;

      // find the user by id
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //   compare the incoming password with the db password
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      //   compare the current password and new password to ensure it is not the same
      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password must be different from the current password",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      //  update the password
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: hashedPassword },
      });

      res.status(200).json({
        status: "success",
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the token
      const userId = parseInt(req.id as string);

      // accept updating changes from the req.body
      const {
        firstName,
        lastName,
        userName,
        phoneNumber,
        address,
        profilePicture,
      } = req.body;
      // get the user by it's id
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "user not found",
        });
      }
      // then update the user data
      await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          userName,
          address,
          phoneNumber,
          profilePicture,
        },
      });

      //   send response
      res.status(200).json({
        status: "success",
        message: "profile updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.id as string, 10);
    // get the profile by his id
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "profile for this user is not found",
      });
    }
    // send response
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    // send response
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  },
  getUserByID: async (req: Request, res: Response, next: NextFunction) => {
    // get the user id from params
    const userId = parseInt(req.params.id as string, 10);

    // get the user by his id
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    // send response
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  },
  changeStatus: async (req: Request, res: Response, next: NextFunction) => {
    // get the user id from params
    const userId = parseInt(req.params.id as string, 10);

    const { status } = req.body;
    // get the user by his id
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    // then update the user data
    await prisma.user.update({
      where: { id: userId },
      data: {
        status: status,
      },
    });
    // send response
    res.status(200).json({
      status: "success",
      message: `user is successfully updated`,
      data: {
        user,
      },
    });
  },
};

export default userController;
