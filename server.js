import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';
import { v4 as uuid } from 'uuid';
import Razorpay from "razorpay";
import cors from 'cors';

// ** Load dotenv first! **
dotenv.config();

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

const app = express();

// ** Initialize Razorpay AFTER loading dotenv **


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', Router);

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URL || "mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.fpg3i.mongodb.net/myreceipe" ;

Connection(URL);

if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

DefaultData();
