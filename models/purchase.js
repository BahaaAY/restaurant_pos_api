const Sequelize = require("sequelize");
const database = require("../util/database");

const Purchase = database.define("purchase", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    purchase_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    purchase_total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
});

module.exports = Purchase;