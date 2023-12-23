import { NextFunction, Request, Response } from "express";
import pkg from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import pool from "../utils/pgClient.js";

const { verify } = pkg;

function authrizeToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Unautharized");
  if (!JWT_SECRET) throw new Error("invalid token");

  verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send(err);
    }
    req.body.user = user;

    next();
  });
}

async function authorizeUserStack(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user } = req.body;
  const stack_id = req.params.stack_id;
  const getUserStack =
    "SELECT * FROM stack WHERE stack_id = $1 AND user_id = $2;";
  const params = [parseInt(stack_id), user.id];

  try {
    const result = await pool.query(getUserStack, params);
    if (result.rowCount === 0) {
      return res.status(404).json({ sucess: false, error: "Not your stack" });
    }
    req.body.user = user;
    req.body.stack_id = parseInt(stack_id);
  } catch (e) {
    return res.status(500).json({
      sucess: false,
      error: "internal server error",
    });
  }
  next();
}

export { authorizeUserStack, authrizeToken };
