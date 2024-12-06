const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
// const Payment = require('../models/payment');
const Transaction = require('../models/payment'); // Assuming your Transaction schema is here
const Raise = require('../models/raise')
require('dotenv/config');
const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1: Create Order API
router.post('/order', (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100), // amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
      console.log(order);
      console.log(options)
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

// ROUTE 2: Verify Payment API
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId, fundId } = req.body;

  try {
    const fundraiser = await Raise.findById(fundId);
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(sign)

    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");
    console.log(expectedSign);
    const isAuthentic = expectedSign === razorpay_signature;

    console.log(isAuthentic)
    if (isAuthentic) {
      const transaction = new Transaction({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: amount,
        fundId: fundId,
        userId: userId
      });
      console.log(transaction);
      await transaction.save();
      const transactionAmount = Number(amount);
      fundraiser.raised += transactionAmount;
      console.log(fundraiser.raised)
      await fundraiser.save();
      res.json({
        message: "Payment Successfully Verified"
      });
    } else {
      res.status(400).json({ message: "Invalid Payment Signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});
router.get('/getDonations/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Transaction.find({ userId: id }).lean();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
