import express from "express";
import Table from "../models/tablemodel.js";

const router = express.Router();

// Get all tables
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create tables (first-time setup)
router.post("/init", async (req, res) => {
  try {
    const { count } = req.body;
    const tables = [];
    for (let i = 1; i <= count; i++) {
      tables.push({ tableNumber: i, status: "empty" });
    }
    await Table.insertMany(tables);
    res.json({ message: `${count} tables created successfully.` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status, customer, food } = req.body;
    const updated = await Table.findByIdAndUpdate(
      req.params.id,
      { status, customer, food },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Table not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: err.message });
  }
});



export default router;
