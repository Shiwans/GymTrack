const mongoose = require("mongoose");

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
      },
    ],

    totalPresent: { type: Number, default: 0 }, // Precomputed for quick access
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
