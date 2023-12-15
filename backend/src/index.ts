import express from "express";
import AuthRoute from "./routes/authRoute.js";
import Stack from "./routes/stackRoute.js";
import Question from "./routes/questionRoute.js";
import pool from "./utils/pgClient.js";
import { corsOptions, PORT } from "./utils/config.js";
import errorHandler from "./middleware/ErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentialsMiddleware.js";

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/stack", Stack);
app.use("/api/v1/question", Question);

app.get("/", async (req, res) => {
  const query = "SELECT * FROM authuser";
  const result = await pool.query(query);

  res.send(result.rows);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
