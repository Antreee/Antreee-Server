const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const User = require("./user.model");
const { isURL } = require("validator");

const restaurants = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	logoUrl: {
		type: String,
		required: true,
		validate: [isURL, "must be a valid URL"],
	},
	cuisine: {
		type: [String],
		required: true,
	},
	address: {
		type: String,
		required: [true, "please enter address"],
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
			index: "2dsphere",
		},
	},
	contactNumber: {
		type: String,
		required: true,
	},
	available: {
		type: Boolean,
		required: true,
	},
	mainImagesUrl: {
		type: [String],
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
