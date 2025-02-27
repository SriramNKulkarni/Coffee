import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

export default connectDB
