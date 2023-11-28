const express = require("express");
const router = express.Router();

const expensesController = require("../controllers/expenses");

router.get("/frequentPurchases", expensesController.getFrequentPurchases);
router.post("/purchase", expensesController.postPurchase);

router.delete("/frequentPurchases/:freqId", expensesController.deleteFrequentPurchase);

module.exports = router;