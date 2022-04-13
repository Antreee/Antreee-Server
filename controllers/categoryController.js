// const FoodCategory = require("../models/category.model");
const { FoodCategory } = require("../models/food.model");

class CategoryController {
	static async getAllCategories(req, res, next) {
		try {
			const categories = await FoodCategory.find();
			res.status(200).json({
				message: "Categories retrieved successfully",
				categories,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CategoryController;
