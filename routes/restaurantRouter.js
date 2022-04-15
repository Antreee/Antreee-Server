const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");
const FoodController = require("../controllers/itemController");

router.post("/", RestaurantController.createRestaurant);
router.get("/", RestaurantController.fetchRestaurant);
router.get("/:id/items", FoodController.getItemByRestaurantId);
router.get("/:id", RestaurantController.fetchRestaurantById);

module.exports = router;
