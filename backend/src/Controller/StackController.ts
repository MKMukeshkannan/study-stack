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
import format from "pg-format";

async function createStackController(req: Request, res: Response) {
  const { user, stack_name, data } = userStackNameBodyValidator.parse(req.body);
  const params = [user.id, stack_name];

  const result = await pool.query(insertStackQuery, params);
  const stack_id = result.rows[0].stack_id;

  const insertParams = [];

  for (let i = 0; i < data.length; i++) {
    insertParams.push([
      stack_id,
      data[i].question_id,
      data[i].question,
      data[i].answer,
    ]);
  }
  console.log(format(
    "INSERT INTO questions (stack_id, question_id, question, answer) VALUES %L",
    insertParams,
  ));
  return res.status(201).send("Sucessfully Created");
}

async function getAllStackController(req: Request, res: Response) {
  const { user } = userOnBodyValidator.parse(req.body);

  const result = await pool.query(getAllStackQuery, [user.id]);

  if (!result.rowCount) return res.status(204).json("No Stacks Created");

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
  const { user, stack_name } = userStackNameBodyValidator.parse(req.body);
  const stackId = stackIdValidator.parse(req.params.id);
  const params = [stack_name, stackId, user.id];

  pool.query(updateStackQuery, params);
  return res.status(200).send("Sucessfully created");
}

export {
  createStackController,
  deleteStackController,
  getAllStackController,
  updateStackController,
};
