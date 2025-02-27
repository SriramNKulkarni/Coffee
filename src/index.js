import dotenv from "dotenv";
import connectDB from "./db/db.js"; // Ensure the file extension is included


dotenv.config({
    path : './env'
})

connectDB() 
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server COnnection Is successful !! ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo DB connection Failes !!",err);
})