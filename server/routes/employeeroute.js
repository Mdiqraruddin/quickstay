import express from "express";
import Employee from "../models/employeemodel.js";

const router = express.Router();

// ➕ Hire employee
router.post("/", async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Get all current employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ active: true }).sort({ hiredAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Fire employee (mark inactive + move to fired list)
router.delete("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    emp.active = false;
    await emp.save();

    res.json({ message: "Employee fired successfully", emp });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📜 Get fired employees (history)
router.get("/fired/all", async (req, res) => {
  try {
    const fired = await Employee.find({ active: false }).sort({ hiredAt: -1 });
    res.json(fired);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
