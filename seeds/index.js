const seedUsers = require('./user-seeds');
const seedTags = require('./tag-seeds');
const seedProducts = require('./product-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  await seedTags();
  await seedProducts();
  console.log('--------------');
  process.exit(0);
};

seedAll();
