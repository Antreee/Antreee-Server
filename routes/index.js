const router = require("express").Router();
const routerCategory = require("./categoryRoutes");
const routerAdmin = require("./adminRouter");
const routerCustomer = require("./customerRouter");
const routerRestaurant = require("./restaurantRouter");

router.use("/admin", routerAdmin);
router.use("/customers", routerCustomer);
router.use("/restaurants", routerRestaurant);
router.use("/categories", routerCategory);

module.exports = router;
