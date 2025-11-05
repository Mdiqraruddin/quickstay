import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  hotelName: String,
  roomType: String,
  price: Number,
  date: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
