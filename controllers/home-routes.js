const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// // get all posts for homepage
router.get('/', (req, res) => {
    res.send('Hello World')
});



module.exports = router;
