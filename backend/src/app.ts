// src/app.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import leaveTypeRoutes from "./routes/leaveTypeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

// Import Prisma client
import prisma from "./config/prisma.js";

// Initialize environment variables
dotenv.config();

const app = express();

// CORS
const corsOptions = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/leaveType", leaveTypeRoutes);
app.use("/api/leave", leaveRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Employee Management System API");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
