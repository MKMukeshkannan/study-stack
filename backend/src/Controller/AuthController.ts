import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { userSchema } from "../utils/validators.js";
import { Request, Response } from "express";
import pool from "../utils/pgClient.js";

async function SignUp(req: Request, res: Response) {
  try {
    const { name, password, email } = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO authuser(name, email, password) VALUES($1, $2, $3)";
    const parameters = [name, email, hashedPassword];
    const result = await pool.query(query, parameters);

    res.status(200).json(result.rows);
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      res.status(400).json(validationError);
    }
  }
}

async function LogIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const query = "SELECT * FROM authuser";
  const result = await pool.query(query);

  const userData = result.rows.filter((val) => val.email === email);

  if (!userData) return res.status(400).send("cannot Find");

  try {
    if (await bcrypt.compare(password, userData[0].password))
      res.send("sucess");
    else res.send("failed");
  } catch (err) {
    res.status(500).send();
  }
}

export { SignUp, LogIn };
