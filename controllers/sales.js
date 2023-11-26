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
            const monthIndex = req.body.month-1;
            const year = req.body.year;
            const startOfMonth = new Date(year, monthIndex, 1);
            const endOfMonth = new Date(year, monthIndex + 1, 1);
            console.log("startOfMonth: ", startOfMonth);
            console.log("endOfMonth: ", endOfMonth);
            try {
                const orders = await Order.findAll({
                    where: {
                      order_date: {
                        [Op.between]: [startOfMonth, endOfMonth],
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
                        [Op.between]: [startOfMonth, endOfMonth],
                      },
                    },
                  });

                const days = [];
                //get the number of days in the month 28 or 29 or 30 or 31
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                // sum sales for each day and store them as Day{date , total}
                for (let i = 1; i <= daysInMonth; i++) {
                    const startOfDay = new Date(year, monthIndex, i);
                    const endOfDay = new Date(year, monthIndex, i + 1);
                    var day_total = await Order.sum('order_total', {
                        where: {
                          order_date: {
                            [Op.between]: [startOfDay, endOfDay],
                          },
                        },
                      });
                      if(day_total == null){
                        day_total = 0;
                      }
                    days.push({date: (year+'-'+(monthIndex+1)+'-'+i), total: day_total});
                }
                res.status(200).json({ count: orders.length, total: total, orders: orders, days: days });
            } catch (err) {
                console.log(err);
            }
            break;

    }

};