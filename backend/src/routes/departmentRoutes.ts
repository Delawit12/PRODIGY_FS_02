import { Router } from "express";
import departmentController from "../controllers/departmentController.js";
import errorHandler from "../utils/error.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.post(
  "/",
  auth,
  isAdmin,
  errorHandler(departmentController.registerDepartment)
);
router.patch(
  "/:id",
  auth,
  isAdmin,
  errorHandler(departmentController.updateDepartment)
);
router.get(
  "/",
  auth,
  isAdmin,
  errorHandler(departmentController.getAllDepartment)
);
router.get(
  "/:id",
  auth,
  isAdmin,
  errorHandler(departmentController.getDepartmentById)
);
router.delete("/:id", auth, isAdmin, errorHandler(departmentController.remove));

export default router;
