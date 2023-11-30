import _ from "lodash";
import express from "express";
import { SignUp, LogIn } from "../Controller/AuthController.js";
import pool from "../utils/pgClient.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const query = "SELECT * FROM authuser";
  const result = await pool.query(query);

  res.send(result.rows);
});

route.post("/sign-up", SignUp);
route.post("/login", LogIn);

export default route;
