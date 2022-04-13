const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const User = require("./user.model");

const restaurants = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	logoUrl: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	cuisine: {
		type: [String],
		required: true,
	},
	coordinate: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	available: {
		type: Boolean,
		required: true,
	},
	mainImageUrl: {
		type: String,
		required: true,
	},
	admin_Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: true,
		index: true,
	},
});

const Restaurant = connection.model("Restaurant", restaurants);

module.exports = Restaurant;
