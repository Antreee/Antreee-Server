const mongoose = require("mongoose");
// const connection = require("../config/mongodb");
const Restaurant = require("./restaurant.model");
const { isURL } = require("validator");

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
		validate: [isURL, "Please enter a valid URL"],
	},
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Restaurant,
		required: true,
		index: true,
	},
	categoryItem: {
		type: String,
		required: true,
	},
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
