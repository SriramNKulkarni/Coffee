import dotenv from "dotenv";
import { connectDB, sequelize } from "./db.js";

dotenv.config({
  path: "./.env",
});

connectDB();

// Sync models with database (if needed)
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Auto-update table structure
    console.log("All models are synchronized with the database.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
})();
