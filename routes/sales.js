const express = require("express");
const router = express.Router();

const salesController = require("../controllers/sales");

router.post("/sales-report/:type",salesController.getSalesReport);

router.get("/orders/:orderId",salesController.getOrderById);
router.delete("/orders/:orderId",salesController.deleteOrderById);


module.exports = router;