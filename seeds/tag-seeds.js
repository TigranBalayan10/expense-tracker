const sequelize = require('../config/connection');
const { Tag } = require('../models');

const tagData = [
{
    "tag_name": "Groceries",
    "tag_color": "red"
},
{
    "tag_name": "Wardrobe",
    "tag_color": "blue"
},
{
    "tag_name": "Mortgage/rent",
    "tag_color": "pink"
},
{
    "tag_name": "Dining",
    "tag_color": "yellow"
},
{
    "tag_name": "Drinks",
    "tag_color": "green"
},

];

const tagUsers = () => Tag.bulkCreate(tagData);

module.exports = tagUsers;
