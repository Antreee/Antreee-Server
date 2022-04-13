const { Food, FoodCategory } = require("../models/food.model");

class FoodController {
	static async createFoodAndCategory(req, res, next) {
		try {
			const {
				name,
				price,
				description,
				imageUrl,
				restaurant_Id,
				categoryFood,
			} = req.body;
			const food = await Food.create({
				name,
				price,
				description,
				imageUrl,
				restaurant_Id,
				categoryFood,
			});
			const category = await FoodCategory.create({
				_id: food.categoryFood._id,
				name: food.categoryFood.name,
			});
			res.status(201).json({
				message: "Food created successfully",
				food,
				category,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = FoodController;
