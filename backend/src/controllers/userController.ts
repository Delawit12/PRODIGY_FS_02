import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import userSchema from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/secret.js";

const userController = {
  loginUser: async (req: Request, res: Response) => {
    // console.log(req.body);
    // userSchema.login.parse(req.body);
    // console.log(req.body);
    // const user = await prisma.user.findFirst({
    //   where: { email: req.body.email },
    // });
    // console.log(user);
    // if (!user) {
    //   return res.status(401).json({
    //     message: "Invalid username or password",
    //     success: false,
    //   });
    // }
    // const isMatch = bcrypt.compareSync(req.body.password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid username or password",
    //   });
    // }
    // const userProfile = await prisma.profile.findFirst({
    //   where: { userId: user.id },
    // });
    // // Create token
    // const payload = {
    //   id: user.id,
    //   role: user.role,
    //   firstName: userProfile?.fname,
    // };
    // const token = jwt.sign(payload, SECRET!);
    // return res.status(200).json({
    //   token,
    //   message: "Login successfully",
    //   success: true,
    // });
  },
  //   myInfo: async (req: Request, res: Response) => {
  //     const user = await prisma.users.findFirst({
  //       where: { id: req.userId },
  //       include: {
  //         _count: true,
  //         profile: true,
  //       },
  //     });
  //     res
  //       .status(200)
  //       .json({ success: true, message: "found successfully", user });
  //   },
  //   changePassword: async (req: Request, res: Response) => {
  //     //check if user exist
  //     const isUser = await prisma.users.findFirst({
  //       where: { id: req.user!.id },
  //     });
  //     if (!isUser) {
  //       return res
  //         .status(401)
  //         .json({ success: false, message: "user not found" });
  //     }
  //     //check if the old passwod is correct
  //     const isMatch = await bcrypt.compareSync(
  //       req.body.oldPassword,
  //       isUser!.password
  //     );
  //     if (!isMatch) {
  //       return res
  //         .status(401)
  //         .json({ success: false, message: "password does not match" });
  //     }
  //     req.body.newPasswod = bcrypt.hashSync(req.body.newPasswod, 10);
  //     //update password
  //     const updatedPassword = await prisma.users.update({
  //       where: { id: req.user!.id },
  //       data: { password: req.body.newPasswod },
  //     });
  //     res.status(200).json({
  //       success: true,
  //       message: "updated successfully",
  //       updatedPassword,
  //     });
  //   },

  //   delete: async (req: Request, res: Response) => {
  //     req.userId = +req.params.id;
  //     // check if user exist usind id and role
  //     const isUserExist = await prisma.users.findFirst({
  //       where: {
  //         AND: [{ id: +req.userId }, { role: req.body.role }],
  //       },
  //     });
  //     if (!isUserExist) {
  //       return res.status(401).json({
  //         message: "user does not exist",
  //       });
  //     }
  //     //start deleting
  //     const isUserDeleted = await prisma.users.delete({
  //       where: {
  //         id: +req.userId,
  //       },
  //     });
  //     res.status(200).json({
  //       message: "sucessfully deleted",
  //       sucess: true,
  //     });
  //   },
  //   confirmOtp: async (req: Request, res: Response) => {
  //     const user = await prisma.users.findFirst({
  //       where: { id: +req.user!.id },
  //       include: {
  //         profile: true,
  //       },
  //     });
  //     if (!user) {
  //       return res
  //         .status(401)
  //         .json({ success: false, message: "user does not found" });
  //     }
  //     const { otp } = req.body;
  //     if (otp != user.otp) {
  //       return res.status(401).json({ success: false, message: "Invalid OTP" });
  //     }

  //     const updatedUser = await prisma.user.update({
  //       where: {
  //         id: user.id,
  //       },
  //       data: {
  //         otp: "000000",
  //         otpCreatedAt: null,
  //         otpExpiry: null,
  //       },
  //     });
  //     // Create token
  //     const payload = {
  //       id: user.id,
  //       role: user.role,
  //       email: user.email,
  //     };
  //     const token = jwt.sign(payload, SECRET!);
  //     return res.status(200).json({
  //       message: "Otp confirmed",
  //       data: updatedUser,
  //       token,
  //     });
  //   },
};

export default userController;
