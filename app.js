const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const database = require("./util/database");

const posRoutes = require("./routes/pos");
const salesRoutes = require("./routes/sales");
const expensesRoutes = require("./routes/expenses");

const Item = require("./models/item");
const Category = require("./models/category");
const ItemVariant = require("./models/item_variant");
const Order = require("./models/order");
const OrderItem = require("./models/order_item");

const Purchase = require("./models/purchase");
const FrequentPurchasesItem = require("./models/purchases_item");
const PurchasedItem = require("./models/purchased_item");

const app = express();

app.use(cors((origin = "http://192.168.1.5:8080"), (credentials = true)));
app.use((req, res, next) => {
  console.log("Middleware");
  console.log(req.method);
  next();
});
app.use(bodyParser.json());

app.use("/pos", posRoutes);
app.use("/sales", salesRoutes);
app.use("/purchases", expensesRoutes);

Category.hasMany(Item,{onDelete: 'cascade', hooks: true});
Item.belongsTo(Category, );

Order.belongsToMany(Item, { through: OrderItem, onDelete: 'cascade', hooks: true });
Item.belongsToMany(Order, { through: OrderItem, onDelete: 'SET NULL', hooks: true });

Order.hasMany(OrderItem, { onDelete: 'cascade', hooks: true });
Item.hasMany(OrderItem, { onDelete: 'SET NULL', hooks: true });

OrderItem.belongsTo(Item, {foreignKey: 'itemId', targetKey: 'id'});

//Order -> Purchase
//OrderItem -> PurchasedItem
//Item -> PurchasesItem(FrequentItem)
//Assoiciations
Purchase.belongsToMany(FrequentPurchasesItem, { through: PurchasedItem, onDelete: 'NO ACTION', hooks: true });
FrequentPurchasesItem.belongsToMany(Purchase, { through: PurchasedItem, onDelete: 'SET NULL', hooks: true });

Purchase.hasMany(PurchasedItem, { onDelete: 'cascade', hooks: true });
FrequentPurchasesItem.hasMany(PurchasedItem, { onDelete: 'SET NULL', hooks: true });

PurchasedItem.belongsTo(FrequentPurchasesItem, {foreignKey: 'frequentPurchasesItemId', targetKey: 'id', onDelete: 'SET NULL', hooks: true});



database.sync(
  // {force: true}
  ).then(() => {
  console.log("Database synced");
  app.listen(3000);
});
