const express = require("express");
const bodyParser = require("body-parser");

const database = require("./util/database");

const posRoutes = require("./routes/pos");

const Item = require("./models/item");
const Category = require("./models/category");
const ItemVariant = require("./models/item_variant");

const app = express();

app.use((req, res, next) => {
  // Fix CORS error
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(bodyParser.json());

app.use("/pos", posRoutes);

Category.hasMany(Item);
Item.belongsTo(Category, { constraints: true, onDelete: "CASCADE" });

database.sync().then(() => {
  console.log("Database synced");
  app.listen(3000);
});
