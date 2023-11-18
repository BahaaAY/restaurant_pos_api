const express = require("express");
const router = express.Router();

const posController = require("../controllers/pos");

router.get("/categories", posController.getCategories);

router.post("/category", posController.postCategory);

router.get("/items", posController.getItems);

router.get("/item/:itemId", posController.getItem);

router.post("/item", posController.postItem);

router.delete("/item/:itemId", posController.deleteItem);

router.patch("/item/:itemId", posController.updateItem);

module.exports = router;
