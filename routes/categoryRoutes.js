const router = require("express").Router();
const CategoryController = require("../controllers/categoryController");

// router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);

module.exports = router;
