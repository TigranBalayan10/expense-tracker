const sequelize = require('../config/connection');
const { Product } = require('../models');

const productData = [
{
    "product_name": "",
    "price": 231.32,
    "tag_id":1,
    "user_id":1
},
{
    "product_name": "",
    "price": 431.32,
    "tag_id":1,
    "user_id":2
},
{
    "product_name": "",
    "price": 131.32,
    "tag_id":1,
    "user_id":3
},
{
    "product_name": "shoes",
    "price": 45.94,
    "tag_id":2,
    "user_id":1
},
{
    "product_name": "shoes",
    "price": 231.32,
    "tag_id":2,
    "user_id":2
},
{
    "product_name": "shoes",
    "price": 101.32,
    "tag_id":2,
    "user_id":3
},
{
    "product_name": "",
    "price": 1831.32,
    "tag_id":3,
    "user_id":1
},
{
    "product_name": "",
    "price": 2231.32,
    "tag_id":3,
    "user_id":2
},
{
    "product_name": "",
    "price": 3131.32,
    "tag_id":3,
    "user_id":3
},
{
    "product_name": "sharky's",
    "price": 61.32,
    "tag_id":4,
    "user_id":1
},
{
    "product_name": "In and Out",
    "price": 31.32,
    "tag_id":4,
    "user_id":2
},
{
    "product_name": "BJ's",
    "price": 201.32,
    "tag_id":4,
    "user_id":3
},
{
    "product_name": "My birthday",
    "price": 931.32,
    "tag_id":5,
    "user_id":1
},
{
    "product_name": "Jameson",
    "price": 101.32,
    "tag_id":5,
    "user_id":2
},
{
    "product_name": "Whiskey Tour",
    "price": 1831.32,
    "tag_id":5,
    "user_id":3
},
];

const makeProducts = () => Product.bulkCreate(productData);

module.exports = makeProducts;
