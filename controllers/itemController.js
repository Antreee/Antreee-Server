const Item = require("../models/item.model");

class ItemController {
	static async getItemByRestaurantId(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				throw {
					code: 404,
					name: "NotFound",
					message: "not found"
				}
			}
			const item = await Item.find({ restaurantId: id });
			if (item.length == 0) {
				throw {
					code: 404,
					name: "NotFound",
					message: "not found"
				}
			}
			res.status(200).json({
				message: "Food retrieved successfully",
				item,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = ItemController;
