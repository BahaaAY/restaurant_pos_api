const Sequelize = require("sequelize");
const database = require("../util/database");

const FrequentPurchasesItem = database.define("frequent_purchases_item", {
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
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = FrequentPurchasesItem;
