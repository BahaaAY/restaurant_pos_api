const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("restaurant", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "Asia/Beirut",
  dialectOptions:{
    timezone: "local"
  }
});

module.exports = sequelize;
