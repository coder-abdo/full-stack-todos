import mongoose from "mongoose";

export async function main(): Promise<void> {
  await mongoose.connect("mongodb://localhost:27017/todos");
}
