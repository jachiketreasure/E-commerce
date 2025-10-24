import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";


dotenv.config();
console.log(" Mongo URI:", process.env.MONGO_URI);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:8000",
    "https://e-commerce-w645.onrender.com",
    "https://ecommerce-backend-bwha.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"]
}));

// Manual CORS headers for additional safety
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:8000",
    "https://e-commerce-w645.onrender.com",
    "https://ecommerce-backend-bwha.onrender.com"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected successfully"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err.message);
  console.log("💡 Make sure MongoDB is running on your system");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String }
});

const Product = mongoose.model("Product", productSchema);

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/", (req, res) => {
  res.send("Backend is running successfully.");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
