import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g. "2025-10-31"
  revenue: { type: Number, default: 0 },
  expenditure: { type: Number, default: 0 },
  description: { type: String, default: "" },
});

const Revenue = mongoose.model("Revenue", revenueSchema);
export default Revenue;
