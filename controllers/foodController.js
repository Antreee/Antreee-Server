const Food = require("../models/food.model");

class FoodController {
	static async createFood(req, res, next) {
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
			res.status(201).json({
				message: "Food created successfully",
				food,
			});
		} catch (err) {
			next(err);
		}
	}

	static async fetchFood(req, res, next) {
		try {
			const foods = await Food.find();
			res.status(200).json(foods);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = FoodController;
