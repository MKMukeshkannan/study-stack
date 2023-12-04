const insertUser =
  "INSERT INTO authuser(name, email, password) VALUES($1, $2, $3)";

const getUserEmail = "SELECT * FROM authuser WHERE email = $1";

const insertStack  = "INSERT INTO stack (user_id, stack_name) VALUES ($1, $2)";


export { insertUser, getUserEmail, insertStack };
