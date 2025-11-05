// resetTables.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Table from "./models/tablemodel.js"; // ✅ path to your model file

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hotelDB";

async function resetTables() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Delete existing tables
    await Table.deleteMany({});
    console.log("🗑️ Old tables deleted");

    // Create 10 new tables
    const tables = [];
    for (let i = 1; i <= 10; i++) {
      tables.push({
        tableNumber: i,
        status: "empty",
        customer: "",
        food: "",
      });
    }

    await Table.insertMany(tables);
    console.log("🍽️ 10 new tables created successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting tables:", err);
    process.exit(1);
  }
}

resetTables();
