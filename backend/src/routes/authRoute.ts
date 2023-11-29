import _ from "lodash";
import express from "express";
import { data, SignUp, LogIn } from "../Controller/AuthController.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.send(data);
});

route.post("/sign-up", SignUp);
route.post("/login", LogIn);

export default route;
