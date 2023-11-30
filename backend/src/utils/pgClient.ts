import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "mukeshkannan",
  host: "localhost",
  database: "studystack",
  password: "password",
  port: 5500,
});

export default pool;
