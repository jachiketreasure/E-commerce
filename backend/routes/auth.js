import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();



router.post("/register", async (req, res) => {
  try {
    console.log("Incoming registration data for:", req.body.email);

    const { firstName, lastName, email, password, phone, gender } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
  
    const newUser = new User({ firstName, lastName, email, password, phone, gender });
    await newUser.save();

    console.log("User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    
    if (err.code === 11000) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});




router.post("/login", async (req, res) => {
  try {
    console.log("=== Login attempt for:", req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Login failed: Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    console.log("Login successful for:", email);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: `${user.firstName} ${user.lastName}`, 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      } 
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    console.log("=== Forgot password request for:", req.body.email);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Forgot password: User not found for email:", email);
      return res.status(200).json({ 
        message: "If an account with that email exists, we've sent a password reset link." 
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Password reset token generated for:", email);
    console.log("Reset token:", resetToken);
    console.log("Reset link would be:", `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`);

    res.status(200).json({ 
      message: "If an account with that email exists, we've sent a password reset link.",
      ...(process.env.NODE_ENV === 'development' && { resetToken })
    });

  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Failed to process password reset request. Please try again." });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    console.log("=== Reset password request");

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = newPassword;
    await user.save();

    console.log("Password reset successful for user:", user.email);
    res.status(200).json({ message: "Password has been reset successfully" });

  } catch (err) {
    console.error("Reset password error:", err.message);

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    
    res.status(500).json({ message: "Failed to reset password. Please try again." });
  }
});

export default router;
