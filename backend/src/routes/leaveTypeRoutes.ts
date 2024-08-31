import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import leaveTypeController from "../controllers/leaveTypeController.js";

const router = Router();

router.post("/", auth, isAdmin, leaveTypeController.registerLeaveType);
router.patch("/:id", auth, isAdmin, leaveTypeController.updateLeaveType);
router.get("/", auth, leaveTypeController.getAllLeaveType);
router.get("/:id", auth, isAdmin, leaveTypeController.getLeaveTypeById);
router.delete("/:id", auth, isAdmin, leaveTypeController.removeLeaveType);

export default router;
