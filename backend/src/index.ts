import express from "express";
import AuthRoute from "./routes/authRoute.js";
import pool from "./utils/pgClient.js";
import { PORT } from "./utils/config.js";

const app = express();
app.use(express.json());

app.use("/auth", AuthRoute);

app.get("/", async (req, res) => {
  const query = "SELECT * FROM authuser";
  const result = await pool.query(query);

  res.send(result.rows);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
