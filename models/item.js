const Sequelize = require("sequelize");
const database = require("../util/database");

const Item = database.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  item_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  item_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Item;
