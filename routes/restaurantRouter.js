const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");

router.post("/", RestaurantController.createRestaurant);

module.exports = router;
