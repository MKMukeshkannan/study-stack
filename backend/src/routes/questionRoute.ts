import express from "express";
import { authorizeUserStack, authrizeToken } from "../middleware/authorize.js";
import { createQuestion, getAllQuestion } from "../Controller/QuestionController.js";

const route = express.Router();

route.post("/create-question/:stack_id",[ authrizeToken, authorizeUserStack], createQuestion);

route.get("/get-questions/:stack_id", [authrizeToken, authorizeUserStack], getAllQuestion)

export default route;
