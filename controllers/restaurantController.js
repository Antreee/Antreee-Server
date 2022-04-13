const Restaurant = require("../models/restaurant.model");

class RestaurantController {
	static async createRestaurant(req, res, next) {
		try {
			const {
				name,
				logoUrl,
				address,
				cuisine,
				coordinate,
				contactNumber,
				available,
				mainImageUrl,
				admin_Id,
			} = req.body;
			const restaurant = await Restaurant.create({
				name,
				logoUrl,
				address,
				cuisine,
				coordinate,
				contactNumber,
				available,
				mainImageUrl,
				admin_Id,
			});
			res.status(201).json({
				message: "Restaurant created successfully",
				restaurant,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = RestaurantController;
