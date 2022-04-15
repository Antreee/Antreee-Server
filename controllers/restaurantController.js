const Restaurant = require("../models/restaurant.model");

class RestaurantController {
	static async createRestaurant(req, res, next) {
		try {
			const {
				name,
				logoUrl,
				address,
				cuisine,
				location,
				contactNumber,
				available,
				mainImagesUrl,
				adminId,
			} = req.body;
			console.log(req.body);
			const restaurant = await Restaurant.create({
				name,
				logoUrl,
				address,
				cuisine,
				location,
				contactNumber,
				available,
				mainImagesUrl,
				adminId,
			});
			res.status(201).json({
				message: "Restaurant created successfully",
				restaurant,
			});
		} catch (err) {
			next(err);
		}
	}

	static async fetchRestaurant(req, res, next) {
		try {
			const restaurant = await Restaurant.find();
			res.status(200).json(restaurant);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async fetchRestaurantById(req, res, next) {
		try {
			const restaurant = await Restaurant.findById(req.params.id);
			res.status(200).json(restaurant);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = RestaurantController;
