const router = require("express").Router();
const routerAdmin = require("./adminRouter");
const routerCustomer = require("./customerRouter");
const routerRestaurant = require("./restaurantRouter");
const routerItem = require("./itemRouters");
const routerOrder = require("./orderRouter");

router.use("/admin", routerAdmin);
router.use("/customers", routerCustomer);
router.use("/restaurants", routerRestaurant);
router.use("/items", routerItem);
router.use("/orders", routerOrder);

module.exports = router;
