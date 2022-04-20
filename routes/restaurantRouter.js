const router = require("express").Router();
const RestaurantController = require("../controllers/restaurantController");
const authentication = require("../middlewares/authentication");

// router.post("/", RestaurantController.createRestaurant);
router.get(
	"/admin",
	authentication,
	RestaurantController.getRestaurantByAdminId
);
router.get("/", RestaurantController.fetchRestaurant);
router.get("/:id/items", RestaurantController.getItemByRestaurantId);
router.get("/:id", RestaurantController.fetchRestaurantById);
router.patch(
	"/:id",
	authentication,
	RestaurantController.updateRestaurantAvailability
);
router.get(
	"/:id/orders",
	authentication,
	RestaurantController.getOrdersByRestaurantId
);
router.get(
	"/:id/booked",
	authentication,
	RestaurantController.getBookedByRestaurantId
);

module.exports = router;
