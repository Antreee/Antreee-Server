const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const Restaurant = require("./restaurant.model");

const foodCatergorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

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
	categoryFood: foodCatergorySchema,
});

const Food = connection.model("Food", food);
const FoodCategory = connection.model("FoodCategory", foodCatergorySchema);

module.exports = { Food, FoodCategory };
