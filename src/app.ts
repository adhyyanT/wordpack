import "./config/profile";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config/database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.get("/health-check", (_, res) => {
  console.log("here");
  res.status(200).json("UP");
});

export default app;
