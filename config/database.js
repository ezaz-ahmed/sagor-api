import mongoose from "mongoose";

const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.DATABASE);
  } catch (error) {
    console.error(`Database Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
