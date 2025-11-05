import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: String,
  hiredAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }, // true = current, false = fired
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
