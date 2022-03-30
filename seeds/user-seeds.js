const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'jwilloughway1',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'iboddam2',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'dstanmer3',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'djiri4',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'msprague5',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'mpergens6',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'tpenniell7',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'msabbins8',
    password: 'password123',
    monthly_income: 10000
  },
  {
    username: 'jmacarthur9',
    password: 'password123',
    monthly_income: 10000
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
