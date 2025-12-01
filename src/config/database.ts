import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGODB_URI!;
    await mongoose.connect(MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};
