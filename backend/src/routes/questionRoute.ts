import express from "express";
import { authorizeUserStack, authrizeToken } from "../middleware/authorize.js";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../Controller/QuestionController.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";

const route = express.Router();

route.post(
  "/create-question/:stack_id",
  [authrizeToken, authorizeUserStack],
  asyncMiddleware(createQuestion),
);

route.get(
  "/get-questions/:stack_id",
  [authrizeToken, authorizeUserStack],
  asyncMiddleware(getAllQuestion),
);

route.put(
  "/get-questions/:question_id",
  [authrizeToken, authorizeUserStack],
  asyncMiddleware(updateQuestion),
);

route.delete(
  "/get-questions/:question_id",
  [authrizeToken, authorizeUserStack],
  asyncMiddleware(deleteQuestion),
);

export default route;
