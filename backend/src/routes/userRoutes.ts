import { Router } from "express";
import errorHandler from "../utils/error.js";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
const router: Router = Router();

router.post(
  "/changePassword",
  auth,
  errorHandler(userController.changePassword)
);
router.patch(
  "/updateProfile",
  auth,
  errorHandler(userController.updateProfile)
);
router.get("/read-me", auth, errorHandler(userController.getProfile));
router.get("/", auth, isAdmin, errorHandler(userController.getAll));
router.get("/:id", auth, isAdmin, errorHandler(userController.getUserByID));
router.patch("/:id", auth, isAdmin, errorHandler(userController.changeStatus));
export default router;
