import mongoose from 'mongoose';

let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  cachedPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      cachedPromise = null;
      throw err;
    });

  return cachedPromise;
};
