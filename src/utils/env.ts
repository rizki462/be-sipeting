import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const PORT = process.env.PORT || 3000;
export const CLIENT_HOST : string = process.env.CLIENT_HOST || "http://localhost:3001";