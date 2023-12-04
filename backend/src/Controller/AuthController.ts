import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { UserType, userSchema } from "../utils/validators.js";
import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import { insertUser, getUserEmail } from "../utils/queries.js";
import { getToken } from "../utils/config.js";

async function SignUp(req: Request, res: Response) {
  try {
    const { name, password, email } = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const parameters = [name, email, hashedPassword];
    await pool.query(insertUser, parameters);

    res.status(200).json({ sucess: true });
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      res.status(400).json({ sucess: false, validationError });
    }

    res.status(500).send({ sucess: false, err });
  }
}

async function LogIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(getUserEmail, [email]);

    if (!result.rowCount)
      return res
        .status(500)
        .json({ sucess: false, message: "Email do not exist" });

    const userData: UserType = result.rows[0];

    if (await bcrypt.compare(password, userData.password)) {
      const token = getToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });
      res.status(200).send({ sucess: true, token });
    } else res.status(401).send({ sucess: false, message: "Wrong Password" });
  } catch (err) {
    res.status(500).send({ sucess: false, message: "Internal Server Error" });
  }
}

export { SignUp, LogIn };
