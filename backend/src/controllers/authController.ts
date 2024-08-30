import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { JWT_SECRET } from "../config/secret.js";
import sendEmail from "../utils/emailSender.js"; // Ensure you have this function implemented

const authController = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role, departmentId } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          status: "fail",
          message: "User already exists with this email account",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          role: role,
          departmentId: departmentId,
        },
      });

      res.status(201).json({
        data: {
          newUser,
          message: "User created successfully",
        },
      });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid email or password",
        });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid email or password",
        });
      }

      if (!JWT_SECRET) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables"
        );
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  forgetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      // Generate OTP or reset token
      const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

      // Update the user with the new reset token
      await prisma.user.update({
        where: { email },
        data: { resetToken },
      });

      // Send OTP to the user via email
      await sendEmail(
        user.email,
        "Password Reset Request",
        `Your OTP for password reset is ${resetToken}.`,
        `<p>Your OTP for password reset is <strong>${resetToken}</strong>.</p>`
      );

      res.status(200).json({
        status: "success",
        message: "reset OTP is sent to your email address",
      });
    } catch (error) {
      next(error);
    }
  },
  confirmOTP: async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    try {
      // Check if the OTP matches
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.resetToken !== otp) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid OTP",
        });
      }

      // Clear the OTP (or reset token) from the database after successful verification
      await prisma.user.update({
        where: { email },
        data: { resetToken: null },
      });

      res.status(200).json({
        status: "success",
        message: "OTP confirmed successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  resendOTP: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      // Generate a new OTP
      const newResetToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Update the user with the new OTP
      await prisma.user.update({
        where: { email },
        data: { resetToken: newResetToken },
      });

      // Send the new OTP via email
      await sendEmail(
        user.email,
        "Resend OTP Request",
        `Your new OTP is ${newResetToken}.`,
        `<p>Your new OTP is <strong>${newResetToken}</strong>.</p>`
      );

      res.status(200).json({
        status: "success",
        message: "New OTP sent to your email address",
      });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { email, newPassword } = req.body;

    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update the user's password
      await prisma.user.update({
        where: { email },
        data: { passwordHash: hashedPassword, resetToken: null }, // Clear the reset token
      });

      await sendEmail(
        email,
        "password successfully updated",
        `Your Password is reset.`,
        `<p><strong>Your Password is reset successfully </strong>.</p>`
      );
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
