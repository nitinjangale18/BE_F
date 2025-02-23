import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

const app = express();

// Middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/', Router);

// Root route to avoid 'Cannot GET /'
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL = process.env.MONGODB_URL || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.fpg3i.mongodb.net/myreceipe`;

// Database connection
Connection(URL);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

// Load default data
DefaultData();
