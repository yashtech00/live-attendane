import mongoose from "mongoose";

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}