import express from 'express';
import { logout, loginUser, sendResetOtp, resetPassword } from '../controllers/authController.js';
import authenticate from '../middleware/userAuth.js';
import Membership from "../Models/membershipModel.js"; // Import Membership model
import Attendance from "../Models/attendanceModel.js"; // Import Attendance model
import Holiday from "../Models/holidayModel.js"; // Import Holiday model

const authRoutes = express.Router();
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', logout);
authRoutes.post('/send-email', sendResetOtp);
authRoutes.post('/set-password', resetPassword);
authRoutes.post("/mark", authenticate, async (req, res) => {
  try {
    const { qrCode } = req.body;
    const timestamp = Math.floor(Date.now() / (1000 * 120)); // Calculate timestamp for 2-minute window
    const expectedCode = `GYM-${timestamp}`;

    if (qrCode !== expectedCode) {
      return res.status(400).json({ success: false, message: "Invalid or expired QR code" });
    }

    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    // Check holiday
    const isHoliday = await Holiday.findOne({ date: new Date(today) });
    if (isHoliday) {
      return res.status(403).json({ success: false, message: "Gym is closed today" });
    }

    // Check membership
    const membership = await Membership.findOne({ userId, isActive: true });
    if (!membership || new Date() > membership.endDate) {
      return res.status(403).json({ success: false, message: "Membership expired! Please renew." });
    }

    // Check for duplicate attendance
    const existingAttendance = await Attendance.findOne({
      userId,
      month: today.slice(0, 7), // "YYYY-MM"
      "attendance.date": new Date(today),
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Attendance already marked today" });
    }

    // Mark attendance
    await Attendance.updateOne(
      { userId, month: today.slice(0, 7) },
      {
        $push: { attendance: { date: new Date(today), shift: "morning" } },
        $inc: { totalPresent: 1 },
      },
      { upsert: true }
    );

    res.json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Error marking attendance" });
  }
});


export default authRoutes;