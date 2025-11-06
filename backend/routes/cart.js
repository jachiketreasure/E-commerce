import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('cart');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error fetching cart." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(404).json({ message: "Product not found." });
    }

    let itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;
    } else {
      user.cart.push({ 
        productId: productDetails._id, 
        name: productDetails.name, 
        image: productDetails.image, 
        price: productDetails.price, 
        quantity 
      });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error("Error adding/updating cart item:", error);
    res.status(500).json({ message: "Server error adding/updating cart item." });
  }
});

router.put("/:productId", authenticateToken, async (req, res) => {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      let itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
  
      if (itemIndex > -1) {
        if (quantity > 0) {
          user.cart[itemIndex].quantity = quantity;
        } else {
          user.cart.splice(itemIndex, 1);
        }
        await user.save();
        return res.json(user.cart);
      } else {
        return res.status(404).json({ message: "Item not found in cart." });
      }
    } catch (error) {
      console.error("Error updating/removing cart item:", error);
      res.status(500).json({ message: "Server error updating/removing cart item." });
    }
  });

router.delete("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error clearing cart." });
  }
});

export default router;
