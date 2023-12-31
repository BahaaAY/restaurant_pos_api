const express = require("express");
const router = express.Router();

const posController = require("../controllers/pos");

router.get("/categories", posController.getCategories);

router.post("/category", posController.postCategory);
router.delete("/category/:catId", posController.deleteCategory);
router.patch("/category/:catId", posController.updateCategory);

router.get("/items", posController.getItems);
router.get("/items/:catId", posController.getItemsByCategory);

router.get("/item/:itemId", posController.getItem);

router.post("/item", posController.postItem);

router.delete("/item/:itemId", posController.deleteItem);

router.patch("/item/:itemId", posController.updateItem);

router.post("/order", posController.postOrder);

module.exports = router;
