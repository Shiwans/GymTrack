import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: String, required: true }, // Format: "YYYY-MM"

    attendance: [
      {
        date: { type: Date, required: true }, // Store only present days
        shift: { type: String, enum: ["morning", "evening"], required: true },
        present: { type: Boolean, default: true },
      },
    ],

    totalPresent: { type: Number, default: 0 }, // Precomputed for quick access
  },
  { timestamps: true }
);

const Attendance  =mongoose.model("Attendance", attendanceSchema);
export default Attendance;