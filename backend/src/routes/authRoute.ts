import express from "express";
import { SignUp, LogIn } from "../Controller/AuthController.js";
import pool from "../utils/pgClient.js";
import { authrizeToken } from "../middleware/authorize.js";

const route = express.Router();

route.post("/sign-up", SignUp);
route.post("/login", LogIn);

route.get("/post", authrizeToken, (req, res) => {
  console.log(req.body.user);
  res.send("sucess");
});

export default route;
