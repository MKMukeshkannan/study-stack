import express from "express";
import { LogIn, SignUp } from "../Controller/AuthController.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";

const route = express.Router();

route.post("/sign-up", asyncMiddleware(SignUp));
route.post("/login", asyncMiddleware(LogIn));

export default route;
