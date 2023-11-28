const express = require("express");
const router = express.Router();

const expensesController = require("../controllers/expenses");

router.get("/frequentPurchases", expensesController.getFrequentPurchases);
router.post("/purchase", expensesController.postPurchase);

router.delete("/purchase/:purchaseId", expensesController.deletePurchase);

router.delete("/frequentPurchases/:freqId", expensesController.deleteFrequentPurchase);

router.post("/expenses-report/:type",expensesController.getPurchasesReport);

module.exports = router;