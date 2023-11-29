const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  HOST: "ec2-35-173-117-186.compute-1.amazonaws.com",
  USER: "pankaj",
  PASSWORD: "p25c04cb92201b23a9d9210ffe156fdd55d9c7b82153217f3c6e72b9320ac08a8",
  DB: "d6rm2bfolkka",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
