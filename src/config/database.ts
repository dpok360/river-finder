import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
      const requiredEnvs = ['MONGODB_URI', 'DB_USERNAME', 'DB_PASSWORD', 'DB_HOST', 'MONGO_DB'];

      const missingEnvs = requiredEnvs.filter(key => !process.env[key]);

      if (missingEnvs.length > 0) {
          console.error('Missing environment variables:', missingEnvs.join(', '));
          process.exit(1);
      }
    const uri = process.env.MONGODB_URI!
        .replace('<username>', process.env.DB_USERNAME!)
        .replace('<password>', encodeURIComponent(process.env.DB_PASSWORD!))
        .replace('<host>', process.env.DB_HOST!)
        .replace('<db>', process.env.MONGO_DB!);
    await mongoose.connect(uri);
    console.log('Database connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};
