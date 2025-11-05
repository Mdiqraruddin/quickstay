import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: String,
  price: Number,
  available: Number,
});

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  rooms: [roomSchema],
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
