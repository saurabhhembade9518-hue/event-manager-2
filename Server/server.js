require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, PORT } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn("⚠️ Razorpay keys are not set. Please check your .env file");
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// API: Get Razorpay key for frontend
app.get("/", (req, res) => {
    res.send("Backend is running");
  });

// API: Create order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const options = {
      amount: amount, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ error: "Error creating order", details: err.message });
  }
});

// API: Verify payment
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ valid: true, orderId: razorpay_order_id, paymentId: razorpay_payment_id });
  } else {
    res.json({ valid: false, message: "Signature mismatch" });
  }
});

const serverPort = PORT || 5000;
app.listen(serverPort, () => console.log(`✅ Server running on http://localhost:${serverPort}`));
