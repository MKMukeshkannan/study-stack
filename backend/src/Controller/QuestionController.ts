import { Request, Response } from "express";
import pool from "../utils/pgClient.js";
import {
  questionIdValidator,
  questionsPostValidator,
  questionUpdateValidator,
  stackIdValidator,
} from "../utils/validators.js";
import {
  deleteQuestionQuery,
  getQuestionsQuery,
  insertQuestionQuery,
  updateQuestionQuery,
} from "../utils/queries.js";
import format from "pg-format";

async function createQuestion(req: Request, res: Response) {
  const { question_id, question, answer } = questionsPostValidator.parse(
    req.body,
  );
  const stackId = stackIdValidator.parse(req.params.stack_id);
  const params = [stackId, question_id, question, answer];
  pool.query(insertQuestionQuery, params);
  return res.status(201).send("Sucessfully created question");
}

async function getAllQuestion(req: Request, res: Response) {
  const stackId = stackIdValidator.parse(req.body.stack_id);
  const result = await pool.query(getQuestionsQuery, [stackId]);
  if (!result.rowCount) {
    return res.status(200).send("No questions in this stack");
  }
  return res.status(200).json(result.rows);
}

async function deleteQuestion(req: Request, res: Response) {
  const questionId = questionIdValidator.parse(req.params.question_id);
  pool.query(deleteQuestionQuery, [questionId]);
  return res.status(200).send("Sucessfully deleted");
}

async function updateQuestion(req: Request, res: Response) {
  const { stack_id, question, answer } = questionUpdateValidator.parse(
    req.body,
  );
  const question_id = questionIdValidator.parse(req.params.question_id);
  pool.query(updateQuestionQuery, [question, answer, stack_id, question_id]);
  return res.status(200).send("Sucessfully Updated");
}

async function updateDifficulty(req: Request, res: Response) {
  const { confidence, data } = req.body;
  const stackId = stackIdValidator.parse(req.body.stack_id);

  const stackParams = [confidence, stackId];
  await pool.query(
    "UPDATE stack SET confidence=$1, last_revised=CURRENT_DATE WHERE stack_id=$2;",
    stackParams,
  );
  const questionParam = [];

  for (let i = 0; i < data.length; i++) {
    questionParam.push([
      stackId,
      parseInt(data[i].question_id),
      parseInt(data[i].difficulty),
    ]);
  }
  await pool.query(
    format(
      `UPDATE questions
SET difficulty=new_val.difficulty
FROM (VALUES %s ) AS new_val(stack_id, question_id, difficulty)
WHERE questions.question_id = new_val.question_id AND questions.stack_id = new_val.stack_id;`,
      questionParam,
    ),
  );

  return res.status(200).send("Sucessfully Updated");
}

export {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  updateDifficulty,
  updateQuestion,
};
