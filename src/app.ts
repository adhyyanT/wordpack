import "./config/profile";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config/database";
import authRoute from "./routes/authRoutes";
import { AppUserValidation } from "./middleware/validation";
import { TAppUserValidationSchema } from "./model/AppUser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.use("/api/v1", AppUserValidation(TAppUserValidationSchema), authRoute);

app.get("/health-check", (_, res) => {
  console.log("here");
  res.status(200).json("UP");
});

export default app;
