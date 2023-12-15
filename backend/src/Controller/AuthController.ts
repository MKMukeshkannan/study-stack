import bcrypt from "bcrypt";
import {
  userLoginValidator,
  userSignUpValidator,
  UserType,
} from "../utils/validators.js";
import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import { getUserEmailQuery, insertUserQuery } from "../utils/queries.js";
import {
  getAccessToken,
  getRefreshToken,
  REFRESH_SECRET,
} from "../utils/config.js";
import pkg from "jsonwebtoken";

const { verify } = pkg;

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
    const access_token = getAccessToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });
    const refresh_token = getRefreshToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    await pool.query(
      "INSERT INTO sessions (userId, refreshToken) VALUES ($1, $2)",
      [userData.id, refresh_token],
    );

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      name: userData.name,
      email: userData.email,
      access_token,
    });
  } else res.status(401).send("Wrong Password");
}

async function RefreshToken(req: Request, res: Response) {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;

  const result = await pool.query(
    "SELECT (id, name, email) FROM authuser u JOIN sessions s ON u.id = s.userId WHERE s.refreshToken = $1",
    [refreshToken],
  );
  const userData: UserType = result.rows[0];
  if (!userData) return res.sendStatus(403);

  if (!REFRESH_SECRET) throw new Error("invalid token");
  verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
    if (err || userData.id === decoded.id) return res.sendStatus(403);
    const access_token = getAccessToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    res.status(200).json(access_token);
  });
}

async function Logout(req: Request, res: Response) {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;

  const result = await pool.query(
    "SELECT (id, name, email) FROM authuser u JOIN sessions s ON u.id = s.userId WHERE s.refreshToken = $1",
    [refreshToken],
  );
  const userData: UserType = result.rows[0];
  if (!userData) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.sendStatus(203);
  }

  await pool.query("DELETE FROM sessions WHERE refreshToken=$1", [
    refreshToken,
  ]);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
}

export { LogIn, Logout, RefreshToken, SignUp };
