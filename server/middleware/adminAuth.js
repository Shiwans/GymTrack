import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.role) {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }
    
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false,  message: "Forbidden: Not an admin" });
    }
    console.log("token form mmiddleare admin auth  real",decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Unauthorized: Invalid token" });
  }
};

export default adminAuth;