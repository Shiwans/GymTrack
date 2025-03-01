import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();
import Token from "../Models/Token.js"

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Please fill all fields" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove old tokens
    await Token.deleteMany({ userId: user._id });

    // Save new token in DB
    await new Token({ userId: user._id, token }).save();

    // ✅ Send token + role to frontend
    return res.json({ 
      success: true, 
      token, 
      role: user.role,
      message: "Login successful"
    });

  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ message: "No token provided" }); // Explicitly send 400
    }

    // Example: Remove token from database (replace with your logic)
    // await Token.deleteOne({ token });

    // Example: Validate token (replace with your logic)
    // try{
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error){
    //   return res.status(400).json({message: "Invalid token"});
    // }

    console.log("Token removed successfully (or validated)");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" }); // Send 500 for server errors
  }
};


export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true});
    } catch (error) {
        res.json({ success: false, message:error.message})
    }
}

//Send Email
export const sendResetOtp = async (req, res) => {
  const {email} = req.body;

  if(!email){
    return res.json({ success: false, message: "Please provide an email" });
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log(otp);

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + (15 * 60 * 1000);

    try {
      await user.save();
      console.log("User updated successfully");
    } catch (err) {
      console.error("Error while saving user:", err);
    }
    
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Set OTP",
      text: `Your OTP for Setting your password is ${otp}. Use this OTP to proceed with setting your password`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Error while sending email:", emailError);
    }
    
    return res.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message});
  }
}

// set Password
export const resetPassword = async (req, res) => {
  // console.log('resetPassword called');
  const {email, otp, newPassword} = req.body;
  if(!email || !otp || !newPassword){
    return res.json({ success: false, message: "Please provide all required fields" });
  }
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: "User not found" });
    }

    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if(user.resetOtpExpireAt < Date.now()){
      return res.json({ success: false, message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const getProfile = async (req, res) => {
  try {
    // Get token from Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from DB using the decoded user ID
    const user = await userModel.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const userRole = async (req, res) => {
  try {
    // Get token from Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.json({ role: "guest" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ role: user.role }); // Return "admin" or "member"
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
