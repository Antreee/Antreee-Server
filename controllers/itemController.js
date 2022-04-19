const Item = require("../models/item.model");

class ItemController {
	static async createItem(req, res, next) {
		try {
			const { name, price, description, imageUrl, restaurantId, categoryItem } =
				req.body;
			const item = await Item.create({
				name,
				price,
				description,
				imageUrl,
				restaurantId,
				categoryItem,
			});
			res.status(201).json({
				message: "Food created successfully",
				item,
			});
		} catch (err) {
			next(err);
		}
	}

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

	static async fetchFood(req, res, next) {
		try {
			const foods = await Item.find();
			res.status(200).json(foods);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = ItemController;
