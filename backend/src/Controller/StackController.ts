import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import { insertStack } from "../utils/queries.js";

async function createStackController(req:Request, res:Response)  {
  const { user , stack_name } = req.body;
  const params = [user.id, stack_name];

    pool.query(insertStack, params);
    return res.json({ sucess: true });
}

async function getAllStackController (req : Request, res : Response) {
  const { user } = req.body;
  const getAllStack = "SELECT * FROM stack WHERE user_id = $1";

    const result = await pool.query(getAllStack, [user.id]);
    return res.json({ sucess: true, result: result.rows });
}

async function deleteStackController (req:Request, res : Response)  {
  const {user} = req.body;
  const deleteStack = "DELETE FROM stack WHERE stack_id = $1 AND user_id = $2";
  const param = [req.params.id,user.id]

    pool.query(deleteStack, param)
    return res.status(200).send({sucess: true})
}

async function updateStackController (req : Request, res:Response) {
  const {user, stack_name} = req.body;
  const params = [stack_name, req.params.id, user.id]
  const updateStack = "UPDATE  stack SET stack_name=$1 WHERE stack_id=$2 AND user_id=$3"
    pool.query(updateStack, params);
    res.status(200).send({sucess: true})
}

export {createStackController, getAllStackController, deleteStackController, updateStackController }
