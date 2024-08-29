import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST;
export const PORT = parseInt(process.env.PORT || "3000");
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
