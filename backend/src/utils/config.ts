import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import { CorsOptions } from "cors";

dotenv.config();
const { sign } = pkg;

const PORT = process.env.PORT || 3000;
const JWT_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET: string | undefined = process.env.REFRESH_TOKEN_SECRET;

const getAccessToken = (payload: any) => {
  if (!JWT_SECRET) throw new Error("Invalid Secret");

  const token = sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

const getRefreshToken = (payload: any) => {
  if (!REFRESH_SECRET) throw new Error("Invalid Secret");

  const token = sign(payload, REFRESH_SECRET, { expiresIn: "30d" });
  return token;
};

const allowedOrgins = [
  "domain.com",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:6969",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:6969",
];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrgins.indexOf(requestOrigin) !== -1) {
      callback(null, requestOrigin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: allowedOrgins,
  optionsSuccessStatus: 200,
};

export {
  allowedOrgins,
  corsOptions,
  getAccessToken,
  getRefreshToken,
  JWT_SECRET,
  PORT,
  REFRESH_SECRET,
};
