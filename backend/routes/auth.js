import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();



router.post("/register", async (req, res) => {
  try {
     console.log("Incoming data:", req.body);

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
  
    // Remove manual hashing since User model's pre('save') middleware handles it
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register:", err.message);
    res.status(500).json({ error: err.message });
  }
});




router.post("/login", async (req, res) => {
  try {
    console.log("=== Incoming login request ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Use the User model's method for password comparison
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Password mismatch for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful for:", email);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: `${user.firstName} ${user.lastName}`, 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email 
      } 
    });

  } catch (err) {
    console.error("💥 Error in login:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
