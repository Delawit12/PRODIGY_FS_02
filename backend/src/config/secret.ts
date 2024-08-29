import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST;
export const PORT = parseInt(process.env.PORT || "3000");
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;





