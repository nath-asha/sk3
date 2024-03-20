const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.googleLogin);

router.get('/google/callback', authController.googleCallback, (req, res) => {
  res.redirect('/'); // Redirect to home page or dashboard
});

module.exports = router;
