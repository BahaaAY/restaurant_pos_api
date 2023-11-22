const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const database = require("./util/database");

const posRoutes = require("./routes/pos");

const Item = require("./models/item");
const Category = require("./models/category");
const ItemVariant = require("./models/item_variant");

const app = express();

app.use(cors((origin = "http://192.168.1.21:7357"), (credentials = true)));
app.use((req, res, next) => {
  console.log("Middleware");
  console.log(req.method);
  next();
});
app.use(bodyParser.json());

app.use("/pos", posRoutes);

Category.hasMany(Item,{onDelete: 'cascade', hooks: true});
Item.belongsTo(Category, );

database.sync().then(() => {
  console.log("Database synced");
  app.listen(3000);
});
