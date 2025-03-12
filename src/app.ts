import "./config/profile";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import "./config/database";
import authRoute from "./routes/authRoutes";
import { ROUTE_PREFIX } from "./constants/constant";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.use(`${ROUTE_PREFIX}/auth`, authRoute);

/**
 * Todo: implement wordPack model and route
 */
// app.use(`${ROUTE_PREFIX}`);
app.get("/health-check", (_, res) => {
  console.log("here");
  res.status(200).json("UP");
});

export default app;
