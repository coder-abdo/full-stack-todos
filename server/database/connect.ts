import mongoose from "mongoose";
import { config } from "dotenv";
config();
export async function main(): Promise<void> {
  await mongoose.connect(`${process.env.MONGOURL}`);
}
