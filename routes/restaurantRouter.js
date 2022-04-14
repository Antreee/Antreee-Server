const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");

router.post("/", RestaurantController.createRestaurant);
router.get("/", RestaurantController.fetchRestaurant);

module.exports = router;
