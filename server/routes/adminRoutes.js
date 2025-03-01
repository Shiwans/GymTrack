import express from 'express';
import { getMembers,addMember,getLastMemberId} from '../controllers/adminController.js';
import QRCode from "qrcode";
import adminAuth from '../middleware/adminAuth.js'
import Attendance from '../Models/attendanceModel.js';
import Holiday from '../Models/holidayModel.js';
import User from '../Models/userModel.js'
import Membership from '../Models/membershipModel.js';
const adminRouter = express.Router();

adminRouter.use(adminAuth);
adminRouter.get("/members", getMembers);
adminRouter.post("/members", addMember);
adminRouter.get("/last-member-id", getLastMemberId);
// Generate and return a QR code dynamically (every request)
adminRouter.get("/generate", async (req, res) => {
    try {
      // Generate a unique code using timestamp (changes every 2 min)
      const timestamp = Math.floor(Date.now() / (1000 * 120)); // Dividing by 120 seconds (2 min)
      const uniqueCode = `GYM-${timestamp}`;
  
      // Convert to QR code
      const qrCodeDataURL = await QRCode.toDataURL(uniqueCode);
  
      res.json({ success: true, qrCode: qrCodeDataURL, uniqueCode });
    } catch (error) {
      console.error("Error generating QR Code:", error);
      res.status(500).json({ success: false, message: "Failed to generate QR code" });
    }
    // try {
  //     const uniqueCode = `GYM-${uuidv4()}`;
  //     const qrCodeDataURL = await QRCode.toDataURL(uniqueCode);
  //     res.json({ success: true, qrCode: qrCodeDataURL, uniqueCode });
  // } catch (error) {
  //     console.error("Error generating QR Code:", error);
  //     res.status(500).json({ success: false, message: "Failed to generate QR code" });
  // }
  });

  adminRouter.get('/attendance',adminAuth,async (req, res) => {
    try {
      const date = new Date(req.query.date);
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  
      const morning = await Attendance.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
        time: 'morning', // Assuming you have a "time" field in your model
      }).populate('member', 'memberId name'); // Assuming you have a "member" field referencing a Member model
  
      const evening = await Attendance.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
        time: 'evening',
      }).populate('member', 'memberId name');
  
      const total = morning.length + evening.length;
      const present = [...morning, ...evening].filter(item => item.member).length; // Count only if member exists
  
      res.json({ total, present, morning, evening });
    } catch (error) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Error fetching attendance:', error);
      res.status(500).json({ message: 'Failed to fetch attendance' });
    }
  });
  
  // Delete attendance record
  adminRouter.delete('/attendance/:id',adminAuth, async (req, res) => {
    try {
      const attendanceId = req.params.id;
      await Attendance.findByIdAndDelete(attendanceId);
      res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
      console.error('Error deleting attendance:', error);
      res.status(500).json({ message: 'Failed to delete attendance' });
    }
  });

  adminRouter.get("/holidays", adminAuth, async (req, res) => {
    try {
      const holidays = await Holiday.find({});
      res.json(holidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      res.status(500).json({ success: false, message: "Failed to fetch holidays" });
    }
  });
  
  // Add a new holiday
  adminRouter.post("/holidays", adminAuth, async (req, res) => {
    try {
      const { date, reason, shift } = req.body;
      const newHoliday = await Holiday.create({ date, reason, shift });
      res.status(201).json({ success: true, data: newHoliday });
    } catch (error) {
      console.error("Error adding holiday:", error);
      res.status(500).json({ success: false, message: "Failed to add holiday" });
    }
  });
  
  // Function to calculate working days (excluding Sundays and holidays)
  async function calculateWorkingDays(year, month) {
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed
    const endDate = new Date(year, month, 0); // Last day of the month
    let workingDays = 0;
  
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      if (date.getDay() !== 0) { // Exclude Sundays (0)
        const isHoliday = await Holiday.findOne({
          date: {
            $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
            $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59),
          },
        });
  
        if (!isHoliday) {
          workingDays++;
        }
      }
    }
    return workingDays;
  }
  adminRouter.post("/attendance/manual", adminAuth, async (req, res) => {
    try {
      const { date, shift, userId } = req.body;
      const month = new Date(date).toISOString().slice(0, 7);
      const year = new Date(date).getFullYear();
      const monthNumber = new Date(date).getMonth() + 1;
  
      let attendanceDoc = await Attendance.findOne({ userId, month });
  
      if (!attendanceDoc) {
        const workingDays = await calculateWorkingDays(year, monthNumber);
        attendanceDoc = new Attendance({
          userId,
          month,
          attendance: [{ date, shift }],
          totalWorkingDays: workingDays,
          totalPresent: 1, // Initialize totalPresent to 1
        });
      } else {
        attendanceDoc.attendance.push({ date, shift });
        attendanceDoc.totalPresent += 1; // Increment totalPresent
      }
  
      await attendanceDoc.save();
      res.status(201).json({ success: true, data: attendanceDoc });
    } catch (error) {
      console.error("Error marking manual attendance:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to mark manual attendance" });
    }
  });
  adminRouter.get("/members/:memberId", adminAuth, async (req, res) => {
    try {
      const memberId = Number(req.params.memberId); // Convert to number
      const member = await User.findOne({ Id: memberId });
      if (!member) {
        return res
          .status(404)
          .json({ success: false, message: "Member not found" });
      }
      res.json({ success: true, member });
    } catch (error) {
      console.error("Error fetching member:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch member" });
    }
  });
//   adminRouter.get("/members/counting", adminAuth, async (req, res) => {
//     try {
//         const count = await User.countDocuments();
//         res.json({ count });
//     } catch (error) {
//         console.error("Error counting members:", error);
//         console.error("Error details:", error.stack);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// });


adminRouter.get("/members/:memberId", adminAuth, async (req, res) => {
  try {
    const memberId = req.params.memberId;

    // Validate memberId (optional)
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ message: "Invalid member ID" });
    }

    const member = await User.findById(memberId);

    if (!member) {
        return res.status(404).json({ message: "Member not found" });
    }

    const memberships = await Membership.find({ userId: member._id });

    res.json({ member, memberships });
} catch (error) {
    console.error("Error fetching member profile:", error);
    res.status(500).json({ message: "Failed to fetch member profile", error: error.message, stack:error.stack });
}
});

// Edit member (similar to view, but you might want to handle updates here)
// adminRouter.get("/members/:memberId/edit", adminAuth, async (req, res) => {
//   try {
//       const memberId = req.params.memberId;
//       const member = await User.findById(memberId);
//       if (!member) {
//           return res.status(404).json({ message: "Member not found" });
//       }
//       res.json({ member });
//   } catch (error) {
//       console.error("Error fetching member for editing:", error);
//       res.status(500).json({ message: "Failed to fetch member for editing" });
//   }
// });

export default adminRouter;