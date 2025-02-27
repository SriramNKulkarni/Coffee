import dotenv from "dotenv";
import connectDB from "./db/db.js"; // Ensure the file extension is included


dotenv.config({
    path : './env'
})

connectDB() 