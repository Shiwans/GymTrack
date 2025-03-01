import jwt from "jsonwebtoken";
import Token from "../Models/Token.js";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Authentication failed. Please log in again." });
  }
};

export default authenticate;
