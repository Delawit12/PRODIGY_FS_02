import { Router } from "express";
import authController from "../controllers/authController.js";
import errorHandler from "../utils/error.js";
import auth from "../middleware/auth.js";

const router = Router();

// user registration by
router.post("/register", errorHandler(authController.registerUser));
// user and admin login
router.post("/login", errorHandler(authController.login));
// forget password
router.post("/forgetPassword", errorHandler(authController.forgetPassword));
// confirm otp
router.post("/confirmOtp", errorHandler(authController.confirmOTP));
// resend otp
router.post("/resendOtp", errorHandler(authController.resendOTP));
// reset password
router.post("/resetPassword", errorHandler(authController.resetPassword));

export default router;
