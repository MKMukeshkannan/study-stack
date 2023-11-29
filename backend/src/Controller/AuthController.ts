import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { UserType, userSchema } from "../utils/validators.js";
import { Request, Response } from "express";

const data: UserType[] = [
  {
    name: "hehlj",
    email: "MK@gmail.com",
    password: "passwored1",
  },
];

async function SignUp(req: Request, res: Response) {
  try {
    const { name, password, email } = userSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    data.push({ name, email, password: hashedPassword });

    res.status(200).json({ email, hashedPassword, name });
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      res.status(400).json(validationError);
    }
  }
}

async function LogIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const userData = data.filter((val) => val.email === email);

  if (!userData) return res.status(400).send("cannot Find");

  try {
    if (await bcrypt.compare(password, userData[0].password))
      res.send("sucess");
    else res.send("failed");
  } catch (err) {
    res.status(500).send();
  }
}

export { data, SignUp, LogIn };
