const mongoose = require("mongoose");
// const connection = require("../config/mongodb");
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
	adminId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: true,
		index: true,
	},
});

restaurants.index({ location: "2dsphere" });


const Restaurant = mongoose.model("Restaurant", restaurants);

module.exports = Restaurant;
