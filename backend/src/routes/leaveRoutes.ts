import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

import leaveController from "../controllers/leaveController.js";

const router = Router();

router.post("/", auth, isAdmin, leaveController.leaveRequest);
router.patch("/:id", auth, isAdmin, leaveController.updateLeaveRequest);
router.get("/", auth, leaveController.getAllLeaveRequest);
router.get("/:id", auth, isAdmin, leaveController.getLeaveRequestById);
router.delete("/:id", auth, isAdmin, leaveController.removeLeaveRequest);

export default router;
