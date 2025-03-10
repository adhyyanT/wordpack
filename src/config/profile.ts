import dotenv from "dotenv";
import path, { join } from "path";

const envFile =
  {
    dev: ".env.dev",
    prod: ".env.prod",
  }[process.env.NODE_ENV || "dev"] || ".env.dev";

dotenv.config({
  path: path.resolve(join(__dirname, "..", envFile)),
});
