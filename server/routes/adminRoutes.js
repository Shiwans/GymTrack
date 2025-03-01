import express from 'express';
import { getMembers,addMember,getLastMemberId} from '../controllers/adminController.js';
import QRCode from "qrcode";
import adminAuth from '../middleware/adminAuth.js'
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
  });

export default adminRouter;