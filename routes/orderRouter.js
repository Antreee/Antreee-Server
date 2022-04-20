const router = require("express").Router();
const orderController = require("../controllers/orderController");

// router.get("/", orderController.fetchOrder);
router.get("/:id", orderController.fetchOrderById);

module.exports = router;
