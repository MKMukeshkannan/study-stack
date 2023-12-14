import express from "express";
import { LogIn, Logout, RefreshToken, SignUp } from "../Controller/AuthController.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";

const route = express.Router();

route.post("/sign-up", asyncMiddleware(SignUp));
route.post("/login", asyncMiddleware(LogIn));
route.get("/refresh", asyncMiddleware(RefreshToken));
route.get("/logout", asyncMiddleware(Logout));

export default route;
