const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const database = require("./util/database");

const posRoutes = require("./routes/pos");
const salesRoutes = require("./routes/sales");

const Item = require("./models/item");
const Category = require("./models/category");
const ItemVariant = require("./models/item_variant");
const Order = require("./models/order");
const OrderItem = require("./models/order_item");

const app = express();

app.use(cors((origin = "http://192.168.1.21:7357"), (credentials = true)));
app.use((req, res, next) => {
  console.log("Middleware");
  console.log(req.method);
  next();
});
app.use(bodyParser.json());

app.use("/pos", posRoutes);
app.use("/sales", salesRoutes);

Category.hasMany(Item,{onDelete: 'cascade', hooks: true});
Item.belongsTo(Category, );

Order.belongsToMany(Item, { through: OrderItem, onDelete: 'cascade', hooks: true });
Item.belongsToMany(Order, { through: OrderItem, onDelete: 'SET NULL', hooks: true });

Order.hasMany(OrderItem, { onDelete: 'cascade', hooks: true });
Item.hasMany(OrderItem, { onDelete: 'SET NULL', hooks: true });

database.sync({}).then(() => {
  console.log("Database synced");
  app.listen(3000);
});
