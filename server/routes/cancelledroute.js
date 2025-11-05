import express from "express";
import CancelledBooking from "../models/cancelledbookingmodel.js";

const router = express.Router();

// 📋 Get all cancelled bookings
router.get("/", async (req, res) => {
  try {
    const cancelled = await CancelledBooking.find();
    res.json(cancelled);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

