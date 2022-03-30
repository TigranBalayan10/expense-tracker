// import all models
const Product = require('./Product');
const User = require('./User');
const Tag = require('./Tag');
const ProductTag = require('./Product_Tag');

// User has many Products
User.hasMany(Product);
Product.belongsTo(User);

// Tags have many Products
Product.belongsToMany(Tag, {
  through: ProductTag,
  // as: "tagged_products",
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  // as: "tagged_products",
  foreignKey: "tag_id",
});


module.exports = { User, Product, Tag, ProductTag };
