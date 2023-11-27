const express = require("express");
const router = express.Router();

const expensesController = require("../controllers/expenses");

router.get("/frequentPurchases", expensesController.getFrequentPurchases);
router.post("/purchase", expensesController.postPurchase);

module.exports = router;