const router = require("express").Router();
const routerCategory = require("./categoryRoutes");
const routerAdmin = require("./adminRouter");
const routerCustomer = require("./customerRouter");
const routerRestaurant = require("./restaurantRouter");

router.use("/admin", routerAdmin);
router.use("/customer", routerCustomer);
router.use("/restaurant", routerRestaurant);
router.use("/category", routerCategory);

module.exports = router;
