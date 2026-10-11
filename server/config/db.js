import mongoose from 'mongoose';

let cachedConnection = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    console.log(`MongoDB connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    cachedConnection = null;
    throw err;
  }
};
