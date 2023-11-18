const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("restaurant", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
