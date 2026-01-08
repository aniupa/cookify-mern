import mongoose from "mongoose";
import { connectToDb } from "../src/db/db.js";
import { userModel } from "../src/models/user.model.js";

const run = async () => {
  try {
    await connectToDb();

    const now = new Date();
    const result = await userModel.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: now, updatedAt: now } }
    );

    console.log(
      `Backfill complete. matched=${result.matchedCount} modified=${result.modifiedCount}`
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error("Backfill failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

run();
