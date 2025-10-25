import express from "express";
import Order from "../models/Order.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new order
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("Order creation request received");
    console.log("User:", req.user);
    console.log("Request body:", req.body);
    
    const orderData = {
      ...req.body,
      userId: req.user._id
    };

    console.log("Order data to save:", orderData);

    const order = new Order(orderData);
    await order.save();

    console.log("Order saved successfully:", order._id);

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      orderNumber: order.orderNumber,
      order
    });
  } catch (err) {
    console.error("Order creation error:", err);
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Failed to create order",
      error: err.message 
    });
  }
});

// Get all orders for a user
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    console.error("Get user orders error:", err);
    res.status(500).json({ 
      message: "Failed to fetch orders",
      error: err.message 
    });
  }
});

// Get a specific order by ID
router.get("/:orderId", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId,
      userId: req.user._id 
    });

    if (!order) {
      return res.status(404).json({ 
        message: "Order not found" 
      });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ 
      message: "Failed to fetch order",
      error: err.message 
    });
  }
});

// Update order status (admin only)
router.patch("/:orderId/status", authenticateToken, async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;
    
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ 
        message: "Order not found" 
      });
    }

    // Check if user is admin or order owner
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Not authorized to update this order" 
      });
    }

    const updateData = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (notes) updateData.notes = notes;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      updateData,
      { new: true }
    );

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ 
      message: "Failed to update order status",
      error: err.message 
    });
  }
});

// Cancel an order
router.patch("/:orderId/cancel", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId,
      userId: req.user._id 
    });

    if (!order) {
      return res.status(404).json({ 
        message: "Order not found" 
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ 
        message: "Cannot cancel this order" 
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order
    });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ 
      message: "Failed to cancel order",
      error: err.message 
    });
  }
});

// Get all orders (admin only)
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Not authorized to view all orders" 
      });
    }

    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    
    const orders = await Order.find(query)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ 
      message: "Failed to fetch orders",
      error: err.message 
    });
  }
});

export default router;
