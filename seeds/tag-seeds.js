const sequelize = require("../config/connection");
const { Tag } = require("../models");

const tagData = [
  {
    tag_name: "Groceries",
    tag_color: "rgba(255, 99, 132, 0.2)",
    user_id: 1,
  },
  {
    tag_name: "Wardrobe",
    tag_color: "rgba(255, 159, 64, 0.2)",
    user_id: 1,
  },
  {
    tag_name: "Mortgage/rent",
    tag_color: "rgba(255, 205, 86, 0.2)",
    user_id: 1,
  },
  {
    tag_name: "Dining",
    tag_color: "rgba(75, 192, 192, 0.2)",
    user_id: 1,
  },
  {
    tag_name: "Drinks",
    tag_color: "rgba(54, 162, 235, 0.2)",
    user_id: 1,
  },
  {
    tag_name: "Groceries",
    tag_color: "red",
    user_id: 2,
  },
  {
    tag_name: "Wardrobe",
    tag_color: "blue",
    user_id: 2,
  },
  {
    tag_name: "Mortgage/rent",
    tag_color: "pink",
    user_id: 2,
  },
  {
    tag_name: "Dining",
    tag_color: "yellow",
    user_id: 2,
  },
  {
    tag_name: "Drinks",
    tag_color: "green",
    user_id: 2,
  },
  {
    tag_name: "Groceries",
    tag_color: "red",
    user_id: 3,
  },
  {
    tag_name: "Wardrobe",
    tag_color: "blue",
    user_id: 3,
  },
  {
    tag_name: "Mortgage/rent",
    tag_color: "pink",
    user_id: 3,
  },
  {
    tag_name: "Dining",
    tag_color: "yellow",
    user_id: 3,
  },
  {
    tag_name: "Drinks",
    tag_color: "green",
    user_id: 3,
  },
];

const tagUsers = () => Tag.bulkCreate(tagData);

module.exports = tagUsers;
