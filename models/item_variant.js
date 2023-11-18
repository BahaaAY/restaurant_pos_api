const Sequelize = require("sequelize");
const database = require("../util/database");

const ItemVariant = database.define("item_variant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  variant_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ItemVariant;
