const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("restaurant", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "Asia/Beirut",
  dialectOptions:{
    typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    timezone: "local"
  }
});

module.exports = sequelize;
