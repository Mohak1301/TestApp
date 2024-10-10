"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// Get the MongoDB URI from the environment variables
const MONGO_URI = process.env.MONGO_URI;
// Default export of the connectDB function
const connectDB = async () => {
    try {
        // Check if MONGO_URI is defined
        if (!MONGO_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        // Connect to MongoDB using the MONGO_URI from the environment
        await mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};
exports.default = connectDB;
