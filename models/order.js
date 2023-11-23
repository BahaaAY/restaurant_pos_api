const Sequelize = require("sequelize");
const database = require("../util/database");

const Order = database.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    order_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    order_total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
});

module.exports = Order;