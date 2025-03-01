import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String, // Format: "YYYY-MM"
    required: true,
  },
  attendance: [
    {
      date: { type: Date, required: true },
      shift: { type: String, enum: ["morning", "evening"], required: true },
      present: { type: Boolean, default: true },
    },
  ],
  totalWorkingDays: {
    type: Number,
    default: 0,
  }, 
  totalPresent: { // Add this field
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;