// import jwt from "jsonwebtoken";
// import Token from "../Models/Token.js";

// const adminAuth = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
//   }

//   try {
//     const tokenExists = await Token.findOne({ token });
//     if (!tokenExists) {
//       return res.status(401).json({ success: false, message: "Invalid or expired token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden: Not an admin" });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };

// export default adminAuth;


import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden: Not an admin" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default adminAuth;