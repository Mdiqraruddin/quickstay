import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/hotelDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
import userRoutes from "./routes/userroute.js";
import bookingRoutes from "./routes/bookingroute.js";
import tableRoutes from "./routes/tableroute.js";
import employeeRoutes from "./routes/employeeroute.js";   // ✅ Add this
import revenueRoutes from "./routes/revenueroute.js";     // ✅ Add this
import cancelledRoutes from "./routes/cancelledroute.js"; // optional, if used


app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/cancelled", cancelledRoutes); 
app.use("/api/revenue", revenueRoutes);
app.use("/api/employees", employeeRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("🏨 Hotel Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
