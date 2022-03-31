// import all models
const Product = require('./Product');
const User = require('./User');
const Tag = require('./Tag');

// User has many Products
User.hasMany(Product);
Product.belongsTo(User);

// Tag has many products
Tag.hasMany(Product);
Product.belongsTo(Tag);

module.exports = { User, Product, Tag };
