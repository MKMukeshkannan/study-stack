import pkg from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { sign } = pkg;

const PORT = process.env.PORT || 3000;
const JWT_SECRET: string | undefined = process.env.SECRET;

const getToken = (payload: any) => {
  if (!JWT_SECRET) throw new Error("Invalid Secret");

  const token = sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export { JWT_SECRET, PORT, getToken };
