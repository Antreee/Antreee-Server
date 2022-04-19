const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");
const FoodController = require("../controllers/itemController");
const authentication = require("../middlewares/authentication");

router.post("/", RestaurantController.createRestaurant);
router.get(
	"/admin",
	authentication,
	RestaurantController.getRestaurantByAdminId
);
router.get("/", RestaurantController.fetchRestaurant);
router.get("/:id/items", FoodController.getItemByRestaurantId);
router.get("/:id", RestaurantController.fetchRestaurantById);
router.patch(
	"/:id",
	authentication,
	RestaurantController.updateRestaurantAvailability
);
router.get("/:id/orders", RestaurantController.getOrdersByRestaurantId);
// router.get("/:id/booked", RestaurantController.getBookedByRestaurantId);

module.exports = router;
