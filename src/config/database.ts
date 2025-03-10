import mongoose from "mongoose";

const uri = process.env.DB_URI;
if (!uri) {
  throw new Error("DB_URI not defined");
}

mongoose.connect(uri).then(() => {
  console.log("db connection established");
});
