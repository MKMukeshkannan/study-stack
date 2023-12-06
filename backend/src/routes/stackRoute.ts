import express from "express";
import { authrizeToken } from "../middleware/authorize.js";
import {
  createStackController,
  deleteStackController,
  getAllStackController,
  updateStackController,
} from "../Controller/StackController.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";

const route = express.Router();

route.get("/get-stacks", authrizeToken, asyncMiddleware(getAllStackController));
route.post(
  "/create-stack",
  authrizeToken,
  asyncMiddleware(createStackController),
);
route.delete(
  "/delete-stack/:id",
  authrizeToken,
  asyncMiddleware(deleteStackController),
);
route.put(
  "/update-stack/:id",
  authrizeToken,
  asyncMiddleware(updateStackController),
);

export default route;
