const router = require("express").Router();
const CategoryController = require("../controllers/categoryController");

router.post("/", CategoryController.createCategory);

module.exports = router;
