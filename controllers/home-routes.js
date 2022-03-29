const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Tag } = require('../models');

// Route to Sign-In Page
router.get('/', (req, res) => {
  // If loggedIn, redirect to dashboard
  res.send('This is the sign in page');
});

// Route to the Dashboard
router.get('/dashboard', (req, res) => {
  res.send('This is the dashboard page');
});

// Route to trigger modal for adding expense
router.get('/add-expense', (req, res) => {
  res.send('This triggers the expense modal');
});

// Route to trigger modal for adding Tag
router.get('/add-tag', (req, res) => {
  res.send('This triggers the tag modal');
});

router.get('/history', (req, res) => {
  res.send('this triggers the history page');
});

module.exports = router;
