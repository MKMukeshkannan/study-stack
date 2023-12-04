import express from "express";
import { authrizeToken } from "../middleware/authorize.js";
import { createStackController, deleteStackController, getAllStackController, updateStackController } from "../Controller/StackController.js";

const route = express.Router();

route.get("/get-stacks", authrizeToken, getAllStackController);
route.post("/create-stack", authrizeToken, createStackController);
route.delete("/delete-stack/:id", authrizeToken, deleteStackController);
route.put("/update-stack/:id", authrizeToken, updateStackController)

export default route;
