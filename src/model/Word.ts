import mongoose, { InferSchemaType, Schema } from "mongoose";
import { z } from "zod";
import { Id } from "./Metadata";

const wordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [3, "Title should be 4 or more characters long"],
      max: [25, "Title should be less than 25 character"],
    },
    description: {
      type: String,
      required: true,
      min: [4, "Description should be 4 or more characters long"],
      max: [100, "Description should be less than 100 character"],
    },
    wordPackId: {
      type: Schema.Types.ObjectId,
      ref: "word_pack",
    },
  },
  { timestamps: true }
);

export const Word = mongoose.model("word", wordSchema);
export type TWord = InferSchemaType<typeof wordSchema> & {
  _id: mongoose.Types.ObjectId;
};
export type TWordRequest = Omit<TWord, "createdAt" | "updatedAt">;
export type TWordResponse = Omit<TWord, "_id"> & Id;

export const TWordValidation = z.object({
  title: z.string().min(3).max(25),
  description: z.string().max(100).min(4),
});
