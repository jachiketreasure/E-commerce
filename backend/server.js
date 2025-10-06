import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import cors from "cors";
import path from "path";

dotenv.config();

const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


const app = express();


app.use(express.json());
app.use(cors({
origin: "http://localhost:5173",
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
}));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);


const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
