const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP } = require('../utils/otpUtils');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/generate-otp', async (req, res) => {
  try {
    const otp = generateOTP();
    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: req.body.email,
      subject: 'OTP for Login',
      text: `Your OTP for login is: ${otp}`
    });
    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
});

router.post('/verify-otp', (req, res) => {
  const { secret, otp } = req.body;
  if (verifyOTP(secret, otp)) {
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

module.exports = router;
