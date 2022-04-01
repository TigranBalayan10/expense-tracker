const sequelize = require('../config/connection');
const { Tag } = require('../models');

const tagData = [
{
    "tag_name": "Groceries",
    "tag_color": "red",
    "user_id": 1
},
{
    "tag_name": "Wardrobe",
    "tag_color": "blue",  
    "user_id": 1
},
{
    "tag_name": "Mortgage/rent",
    "tag_color": "pink",
    "user_id": 1
},
{
    "tag_name": "Dining",
    "tag_color": "yellow",
    "user_id": 1
},
{
    "tag_name": "Drinks",
    "tag_color": "green",
    "user_id": 1
},
{
    "tag_name": "Groceries",
    "tag_color": "red",
    "user_id": 2
},
{
    "tag_name": "Wardrobe",
    "tag_color": "blue",  
    "user_id": 2
},
{
    "tag_name": "Mortgage/rent",
    "tag_color": "pink",
    "user_id": 2
},
{
    "tag_name": "Dining",
    "tag_color": "yellow",
    "user_id": 2
},
{
    "tag_name": "Drinks",
    "tag_color": "green",
    "user_id": 2
},
{
    "tag_name": "Groceries",
    "tag_color": "red",
    "user_id": 3
},
{
    "tag_name": "Wardrobe",
    "tag_color": "blue",  
    "user_id": 3
},
{
    "tag_name": "Mortgage/rent",
    "tag_color": "pink",
    "user_id": 3
},
{
    "tag_name": "Dining",
    "tag_color": "yellow",
    "user_id": 3
},
{
    "tag_name": "Drinks",
    "tag_color": "green",
    "user_id": 3
},
];

const tagUsers = () => Tag.bulkCreate(tagData);

module.exports = tagUsers;
