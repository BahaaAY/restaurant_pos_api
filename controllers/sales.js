const database = require("../util/database");
const Sequelize = require("sequelize");
const { Op } = require('sequelize');
const Item = require("../models/item");
const Category = require("../models/category");
const Order = require("../models/order");
const OrderItem = require("../models/order_item");

exports.getSalesReport = async (req, res, next) => {
    const type = req.params.type; //daily or monthly or yearly
    console.log("type: ", type);
    switch (type) {
        case "daily":

            const date = new Date(req.body.date);
            const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            console.log("body date: ", req.body.date);
            console.log("date: ", date);
            try {
                const orders = await Order.findAll({
                    where: {
                      order_date: {
                        [Op.between]: [startOfDay, endOfDay],
                      },
                    },
                    include: [
                      {
                        model: OrderItem,
                        include: [
                          {
                            model: Item,
                            include: [
                              {
                                model: Category,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  })
                const total = await Order.sum('order_total', {
                    where: {
                      order_date: {
                        [Op.between]: [startOfDay, endOfDay],
                      },
                    },
                  });
                res.status(200).json({ count: orders.length, total: total, orders: orders });
            } catch (err) {
                console.log(err);
            }
            break;
        case "monthly":

    }

};