const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'Mike',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'Tony',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'Brenda',
    password: 'password123',
    monthly_income: 10000
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
