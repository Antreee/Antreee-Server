const router = require("express").Router();
const FoodController = require("../controllers/foodController");

router.post("/", FoodController.createFood);
router.get("/", FoodController.fetchFood);

module.exports = router;
