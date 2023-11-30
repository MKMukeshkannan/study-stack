import express from "express";
import AuthRoute from "./routes/authRoute.js";
import { PORT } from "./utils/config.js";

const app = express();
app.use(express.json());

app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("heoo");
});

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});
