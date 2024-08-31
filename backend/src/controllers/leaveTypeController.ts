import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
const leaveTypeController = {
  registerLeaveType: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, maxDays } = req.body;

      // Check if leave type already exists
      const existingLeaveType = await prisma.leaveType.findUnique({
        where: { name },
      });

      if (existingLeaveType) {
        return res.status(400).json({
          status: "fail",
          message: "leave type with this name already exists",
        });
      }

      const leaveType = await prisma.leaveType.create({
        data: {
          name,
          maxDays,
        },
      });

      res.status(201).json({
        status: "success",
        message: "leave type added successfully",
        data: { leaveType },
      });
    } catch (error) {
      next(error);
    }
  },
  updateLeaveType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { maxDays, status } = req.body;

      const leaveType = await prisma.leaveType.update({
        where: { id: parseInt(id) },
        data: {
          maxDays,
          status,
        },
      });

      if (!leaveType) {
        return res.status(404).json({
          status: "fail",
          message: "Leave type not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "leave type updated successfully",
        data: { leaveType },
      });
    } catch (error) {
      next(error);
    }
  },
  getAllLeaveType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveTypes = await prisma.leaveType.findMany();

      res.status(200).json({
        status: "success",
        data: { leaveTypes },
      });
    } catch (error) {
      next(error);
    }
  },
  getLeaveTypeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const leaveType = await prisma.leaveType.findUnique({
        where: { id: parseInt(id) },
      });

      if (!leaveType) {
        return res.status(404).json({
          status: "fail",
          message: "Leave Type not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: { leaveType },
      });
    } catch (error) {
      next(error);
    }
  },
  removeLeaveType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const leaveType = await prisma.leaveType.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default leaveTypeController;
