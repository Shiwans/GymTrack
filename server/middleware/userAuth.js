import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    const token = req.cookies?.token;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode || !tokenDecode.id || !tokenDecode.role) {
            return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
          }
          
        console.log("this is from admin middleare",token)
        req.user = { id: tokenDecode.id, role: tokenDecode.role }; // Ensure role is attached
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ success: false, message: "Authentication failed. Please log in again." });
    }
};

export default authenticate;
