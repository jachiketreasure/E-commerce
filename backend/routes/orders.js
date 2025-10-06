import express from "express";
import Order from "../models/Order.js";

const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    const order = new Order({ user: userId, products, totalPrice });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
