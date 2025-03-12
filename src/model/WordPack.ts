import mongoose, { InferSchemaType, Schema } from "mongoose";

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
