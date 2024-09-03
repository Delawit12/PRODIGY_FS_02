import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

import leaveController from "../controllers/leaveController.js";
import errorHandler from "../utils/error.js";

const router = Router();

router.post("/", auth, errorHandler(leaveController.leaveRequest));
router.patch(
  "/:id",
  auth,
  isAdmin,
  errorHandler(leaveController.updateLeaveRequest)
);
router.get("/", auth, errorHandler(leaveController.getAllLeaveRequest));
router.get(
  "/:id",
  auth,
  isAdmin,
  errorHandler(leaveController.getLeaveRequestById)
);
router.delete(
  "/:id",
  auth,
  isAdmin,
  errorHandler(leaveController.removeLeaveRequest)
);

export default router;
