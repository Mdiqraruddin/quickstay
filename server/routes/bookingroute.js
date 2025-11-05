import express from "express";
import Booking from "../models/bookingmodel.js";
import CancelledBooking from "../models/cancelledbookingmodel.js";
import Hotel from "../models/hotelmodel.js"; // 👈 we'll use this to update rooms
import Revenue from "../models/revenuemodel.js";


const router = express.Router();

// ➕ Create booking
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save the new booking
    const booking = await Booking.create(req.body);

    // 2️⃣ Extract date and price
    const { date, price } = booking;

    // 3️⃣ Find or create the revenue record for that date
    let record = await Revenue.findOne({ date });
    if (!record) {
      record = await Revenue.create({
        date,
        revenue: price,
        expenditure: 0,
        description: "",
      });
    } else {
      record.revenue += price;
      await record.save();
    }

    res.json({ message: "Booking saved & revenue updated!", booking });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(400).json({ error: err.message });
  }
});


// 📋 Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // move to cancelled collection
    await CancelledBooking.create({
      userEmail: booking.userEmail,
      hotelName: booking.hotelName,
      roomType: booking.roomType,
      price: booking.price,
      date: booking.date,
    });

    // Increase room availability if needed (optional)
    const hotel = await Hotel.findOne({ name: booking.hotelName });
    if (hotel) {
      const room = hotel.rooms.find(
        (r) => r.type.toLowerCase() === booking.roomType.toLowerCase()
      );
      if (room) {
        room.available += 1;
        await hotel.save();
      }
    }

    // 🧮 Update revenue record (subtract this booking’s amount)
    const rev = await Revenue.findOne({ date: booking.date });
    if (rev) {
      rev.revenue = Math.max(0, rev.revenue - (booking.price || 0));
      await rev.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled & revenue updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


   

export default router;
