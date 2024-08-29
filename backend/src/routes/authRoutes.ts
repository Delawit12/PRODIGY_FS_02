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
router.use("/login", errorHandler(authController.forgetPassword));
// confirm otp
router.use("/login", errorHandler(authController.confirmOTP));
// resend otp
router.use("/login", errorHandler(authController.resendOTP));
// reset password
router.use("/login", errorHandler(authController.resetpassword));

export default router;
