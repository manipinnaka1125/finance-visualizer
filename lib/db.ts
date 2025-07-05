import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'Financedbs', // specify your database name explicitly
  });
};

export default connectDB;
