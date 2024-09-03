import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma.js";

const leaveController = {
  leaveRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the id from the token the one who send the request
      const employeeId = parseInt(req.id as string, 10);

      // accept from the request.body
      const { leaveTypeId, startDate, endDate, description } = req.body;

      // get the employee
      const employee = await prisma.user.findUnique({
        where: { id: employeeId },
      });

      // Check if employee exists
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      console.log(employee);

      // check the employee have ongoing leave request
      const ongoingLeaveRequest = await prisma.leaveRequest.findFirst({
        where: {
          employeeId,
          startDate: {
            lte: new Date(endDate),
          },
          endDate: {
            gte: new Date(startDate),
          },
          status: {
            in: ["PENDING", "APPROVED"],
          },
        },
      });

      if (ongoingLeaveRequest) {
        return res.status(400).json({
          error: "You already have a leave request for the selected dates.",
        });
      }

      // Get the leave type and its maximum allowed days
      const leaveType = await prisma.leaveType.findUnique({
        where: { id: leaveTypeId },
      });

      if (!leaveType) {
        return res.status(404).json({ error: "Leave type not found" });
      }

      // Check if the leave type is active
      if (leaveType.status !== "Active") {
        return res.status(400).json({
          error: "The requested leave type is not currently active.",
        });
      }

      const maxAllowedDays = leaveType.maxDays;

      // Calculate the number of days between the start and end dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      const durationInDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (durationInDays > maxAllowedDays) {
        return res.status(400).json({
          error: `The requested leave duration exceeds the maximum allowed days (${maxAllowedDays} days) for this leave type.`,
        });
      }

      //create the request
      const leaveRequest = await prisma.leaveRequest.create({
        data: {
          employeeId,
          leaveTypeId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          description,
        },
      });
      // find all admins
      const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
      // send notification for them about the request
      for (const admin of admins) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            message: `New leave request from ${employee.firstName} ${employee.lastName}`,
          },
        });
      }
      // send response
      res.status(201).json({
        status: "success",
        message: "you request has been  delivered to Admins",
        data: leaveRequest,
      });
    } catch (error) {
      next(error);
    }
  },
  updateLeaveRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leaveRequestId = parseInt(req.params.id as string, 10);
      const { status } = req.body;

      if (!leaveRequestId) {
        return res.status(400).json({ error: "Leave Request ID is required." });
      }
      const existingRequest = await prisma.leaveRequest.findUnique({
        where: { id: leaveRequestId },
      });

      if (!existingRequest) {
        return res.status(404).json({ error: "Leave Request not found." });
      }

      // Update leave request status
      const leaveRequest = await prisma.leaveRequest.update({
        where: { id: leaveRequestId },
        data: { status },
      });

      // Notify the employee
      await prisma.notification.create({
        data: {
          userId: leaveRequest.employeeId,
          message: `Your leave request has been ${status.toLowerCase()}`,
        },
      });

      res.status(200).json({ status: "success", data: leaveRequest });
    } catch (error) {
      next(error);
    }
  },
  getAllLeaveRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leaveRequests = await prisma.leaveRequest.findMany({
        include: {
          employee: true,
          leaveType: true,
        },
      });

      res.status(200).json({ status: "success", data: leaveRequests });
    } catch (error) {}
  },
  getLeaveRequestById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const leaveRequest = await prisma.leaveRequest.findUnique({
        where: { id: parseInt(id) },
        include: {
          employee: true,
          leaveType: true,
        },
      });

      if (!leaveRequest) {
        return res
          .status(404)
          .json({ status: "fail", message: "Leave request not found" });
      }

      res.status(200).json({ status: "success", data: leaveRequest });
    } catch (error) {}
  },
  removeLeaveRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {}
  },
};

export default leaveController;
