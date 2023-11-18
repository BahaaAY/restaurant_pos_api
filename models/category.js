const Sequelize = require("sequelize");
const database = require("../util/database");

const Category = database.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
