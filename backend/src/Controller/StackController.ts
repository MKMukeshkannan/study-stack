import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import {
  deleteStackQuery,
  getAllStackQuery,
  insertStackQuery,
  updateStackQuery,
} from "../utils/queries.js";
import {
  stackIdValidator,
  userOnBodyValidator,
  userStackNameBodyValidator,
} from "../utils/validators.js";

async function createStackController(req: Request, res: Response) {
  const { user, stackName } = userStackNameBodyValidator.parse(req.body);
  const params = [user.id, stackName];

  pool.query(insertStackQuery, params);
  return res.send(201).send("Cucessfully Created");
}

async function getAllStackController(req: Request, res: Response) {
  const { user } = userOnBodyValidator.parse(req.body);

  const result = await pool.query(getAllStackQuery, [user.id]);

  if (!result.rowCount) return res.status(200).send("No Stacks Created");

  return res.json(result.rows);
}

async function deleteStackController(req: Request, res: Response) {
  const { user } = userOnBodyValidator.parse(req.body);
  const stackId = stackIdValidator.parse(req.params.id);

  const param = [stackId, user.id];

  pool.query(deleteStackQuery, param);
  return res.status(200).send("Sucessfully created");
}

async function updateStackController(req: Request, res: Response) {
  const { user, stackName } = userStackNameBodyValidator.parse(req.body);
  const stackId = stackIdValidator.parse(req.params.id);
  const params = [stackName, stackId, user.id];

  pool.query(updateStackQuery, params);
  return res.status(200).send("Sucessfully created");
}

export {
  createStackController,
  deleteStackController,
  getAllStackController,
  updateStackController,
};
