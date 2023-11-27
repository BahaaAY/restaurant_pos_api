const Sequelize = require("sequelize");
const database = require("../util/database");

const PurchasedItem = database.define("purchased_item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
});

module.exports = PurchasedItem;