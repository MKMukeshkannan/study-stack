const insertUser =
  "INSERT INTO authuser(name, email, password) VALUES($1, $2, $3)";

const getUserEmail = "SELECT * FROM authuser WHERE email = $1";

export { insertUser, getUserEmail };
