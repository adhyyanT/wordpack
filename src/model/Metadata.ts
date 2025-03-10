import mongoose from "mongoose";

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type MetadataWithTimestamps = {
  createdBy: mongoose.Types.ObjectId;
} & Timestamps;
