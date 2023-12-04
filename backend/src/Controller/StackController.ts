import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import { insertStack } from "../utils/queries.js";

async function createStackController(req:Request, res:Response)  {
  const { user , stack_name } = req.body;
  const params = [user.id, stack_name];

  try {
    pool.query(insertStack, params);
    return res.json({ sucess: true });
  } catch (e) {
    return res.status(500).send({ sucess: false, error: e });
  }
}

async function getAllStackController (req : Request, res : Response) {
  const { user } = req.body;
  const getAllStack = "SELECT * FROM stack WHERE user_id = $1";

  try {
    const result = await pool.query(getAllStack, [user.id]);
    return res.json({ sucess: true, result: result.rows });
  } catch (e) {
    return res.status(500).send({ sucess: false, error: e });
  }
}

async function deleteStackController (req:Request, res : Response)  {
  const {user} = req.body;
  const deleteStack = "DELETE FROM stack WHERE stack_id = $1 AND user_id = $2";
  const param = [req.params.id,user.id]

  try {
    pool.query(deleteStack, param)
    return res.status(200).send({sucess: true})
  } catch (e) {
    return res.status(403).send({sucess:false, message: e})
  }
}

async function updateStackController (req : Request, res:Response) {
  const {user, stack_name} = req.body;
  const params = [stack_name, req.params.id, user.id]
  const updateStack = "UPDATE  stack SET stack_name=$1 WHERE stack_id=$2 AND user_id=$3"

  try {
    console.log(params)
    pool.query(updateStack, params);
    res.status(200).send({sucess: true})

  } catch (e) {
    return res.status(403).send({sucess:false, message: e})
  }

}

export {createStackController, getAllStackController, deleteStackController, updateStackController }
