const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const Restaurant = require("./restaurant.model");
const FoodCategory = require("./category.model");

const food = new mongoose.Schema({
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
	},
	restaurant_Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Restaurant,
		required: true,
		index: true,
	},
	category_Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: FoodCategory,
		required: true,
		index: true,
	},
});

const Food = connection.model("Food", food);

module.exports = Food;
