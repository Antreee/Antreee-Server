const Item = require("../models/item.model");

class ItemController {
	static async getItemByRestaurantId(req, res, next) {
		try {
			const { id } = req.params;
			const item = await Item.find({ restaurantId: id });
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
