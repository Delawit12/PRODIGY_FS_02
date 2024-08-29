import { Router } from "express";
import authController from "../controllers/authController.js";
import errorHandler from "../utils/error.js";
import auth from "../middleware/auth.js";

const router = Router();

// user registration by
router.use("/register", errorHandler(authController.registerUser));
// user and admin login
router.use("/login", errorHandler(authController.login));
// forget password
router.use("/forgetPassword", errorHandler(authController.forgetPassword));
// confirm otp
router.use("/confirmOtp", errorHandler(authController.confirmOTP));
// resend otp
router.use("/resendOtp", errorHandler(authController.resendOTP));
// reset password
router.use("/resetPassword", errorHandler(authController.resetPassword));

export default router;
