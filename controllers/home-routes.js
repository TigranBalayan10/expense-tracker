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
  res.sendFile('/Users/anthonybarragan/Desktop/projects/expense-tracker/public/html/piechart.html');
});
// // get all posts for homepage
router.get('/', (req, res) => {
  res.send('Hello World')

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


router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    monthly_income: req.body.monthly_income
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
