import mongoose, { InferSchemaType, model, Mongoose, Schema } from "mongoose";
import * as z from "zod";
import { Id } from "./Metadata";

const appUserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: {
      type: String,
      min: [3, "Password should be 3 or more characters long"],
      max: [16, "Password should be less than 16 character"],
      required: true,
    },
    name: {
      type: String,
      max: [20, "Name cannot be more than 20 characters"],
      min: [3, "Name cannot be less than 20 characters"],
      required: true,
    },
    wordPacks: {
      type: [{ type: Schema.Types.ObjectId, ref: "WordPack", default: [] }],
    },
  },
  {
    timestamps: true,
  }
);

export const AppUser = model("app_user", appUserSchema);
export type TAppUser = InferSchemaType<typeof appUserSchema>;

export type TAppUserRegisterRequest = Omit<TAppUser, "createdAt" | "updatedAt">;
export type TAppUserLoginRequest = Omit<TAppUserRegisterRequest, "name">;

export type TAppUserResponse = Omit<TAppUser, "password"> & Id;

export const TAppUserRegisterValidationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  password: z.string().min(3).max(16),
});
export const TAppUserLoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(16),
});
