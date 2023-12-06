import bcrypt from "bcrypt";
import {
  userLoginValidator,
  userSignUpValidator,
  UserType,
} from "../utils/validators.js";
import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import { getUserEmailQuery, insertUserQuery } from "../utils/queries.js";
import { getToken } from "../utils/config.js";

async function SignUp(req: Request, res: Response) {
  if (!req.body) return;
  const { name, password, email } = userSignUpValidator.parse(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  const parameters = [name, email, hashedPassword];
  await pool.query(insertUserQuery, parameters);

  res.status(200).json({ sucess: true });
}

async function LogIn(req: Request, res: Response) {
  const { email, password } = userLoginValidator.parse(req.body);
  const result = await pool.query(getUserEmailQuery, [email]);

  if (!result.rowCount) {
    return res
      .status(400)
      .send("Email do not exist");
  }

  const userData: UserType = result.rows[0];

  if (await bcrypt.compare(password, userData.password)) {
    const token = getToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });
    res.status(200).send({ sucess: true, token });
  } else res.status(401).send({ sucess: false, message: "Wrong Password" });
}

export { LogIn, SignUp };
