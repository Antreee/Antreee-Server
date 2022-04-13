const FoodCategory = require("../models/category.model");

class CategoryController {
	static async createCategory(req, res, next) {
		try {
			const category = await FoodCategory.create(req.body);
			res.status(201).json({
				message: "Category created successfully",
				category,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CategoryController;
