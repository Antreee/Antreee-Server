const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");

router.post("/", RestaurantController.createRestaurant);
router.get("/", RestaurantController.fetchRestaurant);
router.get("/:id/food");
router.get("/:id", RestaurantController.fetchRestaurantById);

module.exports = router;
