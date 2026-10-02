import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";

const VALID_PLANS = {
  basic: { amount: 100, credits: 150 },
  pro: { amount: 500, credits: 650 },
};

export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = VALID_PLANS[planId];

    if (!plan) {
      return res.status(400).json({ message: "Invalid or unsupported plan selected." });
    }

    const { amount, credits } = plan;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${req.userId.toString().slice(-4)}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      userId: req.userId,
      planId,
      amount,
      credits,
      razorpayOrderId: order.id,
      status: "created",
    });

    return res.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return res.status(500).json({ message: `Failed to create payment order: ${error.message || error}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing required payment verification details." });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature verification failed." });
    }

    // Atomic update: only mark as paid if not already paid (prevents race conditions & double-credit glitches)
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id, status: { $ne: "paid" } },
      { status: "paid", razorpayPaymentId: razorpay_payment_id },
      { returnDocument: 'after' }
    );

    if (!payment) {
      // Check if already processed (idempotency)
      const existingPayment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (existingPayment && existingPayment.status === "paid") {
        const user = await User.findById(req.userId);
        return res.json({
          success: true,
          message: "Payment was already verified and credits applied.",
          user,
        });
      }
      return res.status(404).json({ message: "Payment order record not found." });
    }

    // Add credits to user atomically
    const updatedUser = await User.findByIdAndUpdate(
      payment.userId,
      { $inc: { credits: payment.credits } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Payment verified successfully and credits added!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ message: `Failed to verify payment: ${error.message || error}` });
  }
};