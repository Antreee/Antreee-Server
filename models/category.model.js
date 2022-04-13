const mongoose = require("mongoose");
const connection = require("../config/mongodb");

const categories = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const Category = connection.model("Category", categories);

module.exports = Category;
