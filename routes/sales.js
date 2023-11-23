const express = require("express");
const router = express.Router();

const salesController = require("../controllers/sales");

router.post("/sales-report/:type",salesController.getSalesReport);

module.exports = router;