import mongoose from 'mongoose';

let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (cachedPromise) {
    return cachedPromise;
  }

  const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://mahfooz123:alam123@cluster0.tpfp1su.mongodb.net/traveloop';

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
