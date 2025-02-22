
import { response } from 'express'
import formidable from 'formidable'
import { request } from 'https'
import https from 'https';
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY, 
    key_secret: process.env.RAZORPAY_SECRET
});

export const addPaymentGateway = async (req, res) => {
    try {
        console.log("✅ Inside backend controller");
        console.log("📩 Received Data:", req.body); // Debugging request data

        const { amount, currency } = req.body;

        // Ensure amount and currency are present
        if (!amount || !currency) {
            console.error("❌ Amount or currency missing");
            return res.status(400).json({ success: false, error: "Amount or currency missing" });
        }

        // Log Razorpay instance verification
        console.log("🔑 Razorpay Key ID:", process.env.RAZORPAY_KEY || "NOT SET");
        console.log("🔑 Razorpay Key Secret:", process.env.RAZORPAY_SECRET ? "Loaded" : "NOT SET");

        // Define order options
        const options = {
            amount: amount * 100, // Convert to paisa (smallest currency unit)
            currency,
            receipt: `order_rcptid_${Date.now()}`
        };

        console.log("📌 Creating Razorpay order with options:", options);

        // Create order
        const order = await razorpay.orders.create(options);

        console.log("✅ Order Created Successfully:", order);
        res.json({ success: true, order });
    } 
    catch (error) {
        console.error("❌ Error creating order:", error);

        if (error.response) {
            console.error("🔴 Razorpay API Response Error:", error.response.data);
        }

        res.status(500).json({ success: false, error: error.message });
    }
};



export const verifyPayment = async (req, res) => {
    try {
        console.log("🔍 Verifying Payment:", req.body);

        const { order_id, payment_id, signature } = req.body;

        if (!order_id || !payment_id || !signature) {
            return res.status(400).json({ success: false, error: "Missing parameters" });
        }

        // Securely fetch secret key from environment variables
        const secret = process.env.RAZORPAY_SECRET;

        // Validate signature
        const generated_signature = crypto.createHmac("sha256", secret)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        if (generated_signature !== signature) {
            console.error("❌ Invalid Signature");
            return res.status(400).json({ success: false, error: "Invalid signature" });
        }

        console.log("✅ Payment Verified Successfully!");
        res.json({ success: true, message: "Payment Verified Successfully!" });

    } catch (error) {
        console.error("❌ Payment Verification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

