const database = require("../util/database");
const Sequelize = require("sequelize");

const Item = require("../models/item");
const Category = require("../models/category");
const ItemVariant = require("../models/item_variant");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories: categories });
  } catch (err) {
    console.log(err);
  }
};

exports.postCategory = async (req, res, next) => {
  console.log("sadad: ", req.body.category_name);
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json({ message: "Category created", category: category });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const catId = req.params.catId;
  try {
    const category = await Category.findByPk(catId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.log(err);
  }
};
exports.updateCategory = async (req, res, next) => {
  const catId = req.params.catId;
  const category_name = req.body.category_name;
  const category = await Category.findByPk(catId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  category.category_name = category_name;
  await category.save();
  return res.status(200).json({ message: "Category updated", category: category });
};

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};

exports.getItemsByCategory = async (req, res, next) => {
  const catId = req.params.catId;
  try {
    const items = await Item.findAll({
      where: {
        categoryId: catId,
      },
      include: [
        {
          model: Category,
        },
      ],
    });
    res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};

exports.getItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findByPk(itemId, {
      include: [
        {
          model: Category,
        },
      ],
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item: item });
  } catch (err) {
    console.log(err);
  }
};
exports.postItem = async (req, res, next) => {
  const item_name = req.body.item_name;
  const item_price = req.body.item_price;
  const item_category = req.body.item_category;
  //   const item_variants = req.body.item_variants;
  //   console.log("item_variants: ", item_variants);

  try {
    const item = await Item.create({
      item_name: item_name,
      item_price: item_price,
      categoryId: item_category,
    });

    // for (let i = 0; i < item_variants.length; i++) {
    //   const item_variant = await ItemVariant.create({
    //     variant_name: item_variants[i],
    //     itemId: item.id,
    //   });
    // }

    res.status(201).json({ message: "Item created", item: item });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.destroy();
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const item_name = req.body.item_name;
  const item_price = req.body.item_price;
  const item_category = req.body.item_category;
  // const item_variants = req.body.item_variants;
  // console.log("item_variants: ", item_variants);
  const item = await Item.findByPk(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  item.item_name = item_name;
  item.item_price = item_price;
  item.categoryId = item_category;
  await item.save();
  return res.status(200).json({ message: "Item updated", item: item });
};
