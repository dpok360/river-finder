import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    const MONGO_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DB_DB}?authSource=admin`;

    mongoose.connect(MONGO_URI)
        .then(() => console.log("Database connected"))
        .catch(err => console.error("DB connection error:", err));
};
