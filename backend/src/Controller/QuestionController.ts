import { Request, Response } from "express";
import pool from "../utils/pgClient.js";

async function createQuestion (req : Request, res: Response) {
  const { question_id, question, answer } = req.body;
  const insertQuestion = "INSERT INTO questions (stack_id, question_id, question, answer) VALUES ($1, $2, $3, $4);";
  const params = [req.params.stack_id, question_id, question, answer];

  try {
    pool.query(insertQuestion, params);
    return res.json({ sucess: true });
  } catch (e) {
    return res.status(500).send({ sucess: false, error: e });
  }
}

async function getAllQuestion (req : Request, res: Response) {
  const getQuestions = "SELECT * FROM questions WHERE stack_id = $1;"
  const params = [req.params.stack_id]

  try {
    const result = await pool.query(getQuestions, params);
    return res.json({sucess: true, result: result.rows})
  } catch (e) {
    return res.status(500).json({sucess: false, error: e})
  }
}

export {createQuestion, getAllQuestion}
