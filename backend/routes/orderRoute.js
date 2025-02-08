const express = require("express");
const adminAuth = require("../middleware/adminAuth.js");
const authUser = require("../middleware/auth.js");
const {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyRazorpay
} = require("../controllers/orderController.js");

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);


// Payment features
orderRouter.post("/place",authUser,placeOrder);
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

// User feature
orderRouter.post("/userorders",authUser,userOrders)

// verify payment
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay);

module.exports = orderRouter;
