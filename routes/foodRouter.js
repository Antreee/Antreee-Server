const router = require("express").Router();
const FoodController = require("../controllers/foodController");

router.post("/", FoodController.createFoodAndCategory);

module.exports = router;
