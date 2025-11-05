import mongoose from "mongoose";

const cancelledSchema = new mongoose.Schema({
  userEmail: String,
  hotelName: String,
  roomType: String,
  price: Number,
  date: String,
  cancelledAt: { type: Date, default: Date.now },
});

const CancelledBooking = mongoose.model("CancelledBooking", cancelledSchema);
export default CancelledBooking;
