import mongoose from 'mongoose';

mongoose.connection.on("connected", () => console.log("Mongoose connected to DB"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));
mongoose.connection.on("disconnected", () => console.log("Mongoose disconnected"));

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.info("MongoDB connected");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
