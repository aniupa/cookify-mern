import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log("connected to db successfully");
};
