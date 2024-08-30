import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";

const departmentController = {
  registerDepartment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      // Check if department already exists
      const existingDepartment = await prisma.department.findUnique({
        where: { name },
      });

      if (existingDepartment) {
        return res.status(400).json({
          status: "fail",
          message: "Department with this name already exists",
        });
      }

      const department = await prisma.department.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        status: "success",
        message: "department created successfully",
        data: { department },
      });
    } catch (error) {
      next(error);
    }
  },

  updateDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const department = await prisma.department.update({
        where: { id: parseInt(id) },
        data: {
          status,
        },
      });

      if (!department) {
        return res.status(404).json({
          status: "fail",
          message: "Department not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "department updated successfully",
        data: { department },
      });
    } catch (error) {
      next(error);
    }
  },
  getAllDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departments = await prisma.department.findMany();

      res.status(200).json({
        status: "success",
        data: { departments },
      });
    } catch (error) {
      next(error);
    }
  },
  getDepartmentById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const department = await prisma.department.findUnique({
        where: { id: parseInt(id) },
      });

      if (!department) {
        return res.status(404).json({
          status: "fail",
          message: "Department not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: { department },
      });
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const department = await prisma.department.delete({
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

export default departmentController;
