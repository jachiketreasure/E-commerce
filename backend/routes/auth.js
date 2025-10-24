import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();



router.post("/register", async (req, res) => {
  try {
    console.log("Incoming registration data for:", req.body.email);

    const { firstName, lastName, email, password, phone, gender } = req.body;

    // Input validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Email validation
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

    console.log("✅ User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    
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

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Login failed: User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Use the User model's method for password comparison
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("❌ Login failed: Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    console.log("✅ Login successful for:", email);
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
    console.error("💥 Login error:", err.message);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

export default router;
