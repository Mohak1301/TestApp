import mongoose from 'mongoose';
import 'dotenv/config';

// Get the MongoDB URI from the environment variables
const MONGO_URI: string | undefined = process.env.MONGO_URI;

// Default export of the connectDB function
const connectDB = async (): Promise<void> => {
  try {
    // Check if MONGO_URI is defined
    if (!MONGO_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // Connect to MongoDB using the MONGO_URI from the environment
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
