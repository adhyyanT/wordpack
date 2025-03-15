import mongoose, { InferSchemaType, Schema } from "mongoose";
import * as z from "zod";
import { TWord, TWordResponse, TWordValidation } from "./Word";
import { Id } from "./Metadata";

const wordPackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [4, "Title should be 4 or more characters long"],
      max: [25, "Title should be less than 25 character"],
    },
    description: {
      type: String,
      required: true,
      min: [4, "Description should be 4 or more characters long"],
      max: [100, "Description should be less than 100 character"],
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "AppUser",
    },
    words: {
      type: [{ type: Schema.Types.ObjectId, ref: "word", default: [] }],
    },
  },
  { timestamps: true }
);

export const WordPack = mongoose.model("word_pack", wordPackSchema);

export type TWordPack = InferSchemaType<typeof wordPackSchema>;
export type TWordPackRequest = Omit<TWordPack, "createdAt" | "updatedAt">;
export type TWordPopulated = Omit<TWordPack, "words"> & { words: TWord[] } & {
  _id: mongoose.Types.ObjectId;
};
export type TWordPackResponse = Omit<
  TWordPack,
  "createdAt" | "updatedAt" | "words"
> &
  Id & { words: TWordResponse[] };
export const TWordPackValidation = z.object({
  title: z.string().min(4).max(25),
  description: z.string().min(4).max(100),
  isPublic: z.boolean(),
  words: TWordValidation.array().optional(),
});
