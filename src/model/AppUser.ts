import { InferSchemaType, model, Schema } from "mongoose";
import * as z from "zod";

const appUserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: {
      type: String,
      min: [3, "Password should be 4 or more characters long"],
      max: [16, "Password should be less than 16 character"],
      required: true,
    },
    name: {
      type: String,
      max: [20, "Name cannot be more than 20 characters"],
      min: [3, "Name cannot be less than 20 characters"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AppUser = model("AppUser", appUserSchema);

export type TAppUser = InferSchemaType<typeof appUserSchema>;

export type TAppUserRequest = Omit<TAppUser, "createdAt" | "updatedAt">;

export type TAppUserResponse = Omit<TAppUser, "password">;

export const TAppUserValidationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  password: z.string().min(3).max(16),
});
