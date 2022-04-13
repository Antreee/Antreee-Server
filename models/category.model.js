const mongoose = require("mongoose");
const connection = require("../config/mongodb");

const foodCategories = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const FoodCategory = connection.model("FoodCategory", foodCategories);

module.exports = FoodCategory;
