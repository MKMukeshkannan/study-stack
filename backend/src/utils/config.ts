import pkg from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { sign } = pkg;

const PORT = process.env.PORT || 3000;
const JWT_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET: string | undefined = process.env.REFRESH_TOKEN_SECRET;

const getAccessToken = (payload: any) => {
  if (!JWT_SECRET) throw new Error("Invalid Secret");

  const token = sign(payload, JWT_SECRET, { expiresIn: "30s" });
  return token;
};

const getRefreshToken =  (payload: any) => {
  if (!REFRESH_SECRET) throw new Error("Invalid Secret");

  const token = sign(payload, REFRESH_SECRET, { expiresIn: "1d" });
  return token;
};

export { JWT_SECRET, REFRESH_SECRET, PORT, getRefreshToken, getAccessToken };
