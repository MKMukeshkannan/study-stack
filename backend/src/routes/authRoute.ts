import express from "express";
import { SignUp, LogIn } from "../Controller/AuthController.js";

const route = express.Router();

route.post("/sign-up", SignUp);
route.post("/login", LogIn);

export default route;
