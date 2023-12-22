const insertUserQuery =
  "INSERT INTO authuser(name, email, password) VALUES($1, $2, $3)";
const getUserEmailQuery = "SELECT * FROM authuser WHERE email = $1";
const insertStackQuery =
  "INSERT INTO stack (user_id, stack_name) VALUES ($1, $2) RETURNING stack_id";
const getAllStackQuery = "SELECT * FROM stack WHERE user_id = $1";
const deleteStackQuery =
  "DELETE FROM stack WHERE stack_id = $1 AND user_id = $2";
const insertQuestionQuery =
  "INSERT INTO questions (stack_id, question_id, question, answer) VALUES ($1, $2, $3, $4);";
const getQuestionsQuery = "SELECT * FROM questions WHERE stack_id = $1;";
const deleteQuestionQuery = "DELETE FROM question WHERE question_id = $1";
const updateStackQuery =
  "UPDATE stack SET stack_name=$1 WHERE stack_id=$2 AND user_id=$3";
const updateQuestionQuery =
  "UPDATE question SET question=$1, answer=$2 WHERE stack_id=$3 AND question_id=$4";

export {
  deleteQuestionQuery,
  deleteStackQuery,
  getAllStackQuery,
  getQuestionsQuery,
  getUserEmailQuery,
  insertQuestionQuery,
  insertStackQuery,
  insertUserQuery,
  updateQuestionQuery,
  updateStackQuery,
};
