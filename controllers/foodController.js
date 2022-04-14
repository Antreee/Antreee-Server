const Food = require("../models/food.model");

class FoodController {
	static async createFoodAndCategory(req, res, next) {
		try {
			const {
				name,
				price,
				description,
				imageUrl,
				restaurant_Id,
				foodCategory,
			} = req.body;
			const food = await Food.create({
				name,
				price,
				description,
				imageUrl,
				restaurant_Id,
				foodCategory,
			});
			res.status(201).json({
				message: "Food created successfully",
				food,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = FoodController;
