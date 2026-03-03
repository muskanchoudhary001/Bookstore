import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("✅ Connected to Database");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export default conn;