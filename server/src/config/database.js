import mongoose from "mongoose";
import config from "./index.js";

const { DATABASE_URL } = config;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
