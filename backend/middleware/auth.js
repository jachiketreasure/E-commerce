import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {
  try {
    console.log("Auth middleware - Headers:", req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    console.log("Auth middleware - Token:", token ? "Present" : "Missing");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth middleware - Decoded token:", decoded);
    
    const user = await User.findById(decoded.id).select('-password');
    console.log("Auth middleware - User found:", user ? "Yes" : "No");
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired." });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(500).json({ message: "Server error." });
  }
};
