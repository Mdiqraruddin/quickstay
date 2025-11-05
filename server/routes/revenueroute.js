import express from "express";
import Revenue from "../models/revenuemodel.js";

const router = express.Router();

// 📥 Save or update revenue for a given date
router.post("/", async (req, res) => {
  try {
    const { date, revenue, expenditure, description } = req.body;

    let record = await Revenue.findOne({ date });
    if (record) {
      record.revenue = revenue;
      record.expenditure = expenditure;
      record.description = description;
      await record.save();
    } else {
      record = await Revenue.create({ date, revenue, expenditure, description });
    }

    res.json({ message: "Revenue record saved successfully", record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📤 Get all revenue records
router.get("/", async (req, res) => {
  try {
    const data = await Revenue.find().sort({ date: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
