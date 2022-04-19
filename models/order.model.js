const mongoose = require("mongoose");
const Restaurant = require("./restaurant.model");

const order = new mongoose.Schema({
	customerName: {
		type: String,
	},
	customerPhoneNumber: {
		type: String,
	},
	tableNumber: {
		type: String,
	},
	totalPrice: {
		type: Number,
	},
	bookingDate: {
		type: String,
	},
	numberOfPeople: {
		type: String,
	},
	status: {
		type: String,
	},
	customerEmail: {
		type: String,
	},
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Restaurant,
		required: true,
		index: true,
	},
});

const Order = mongoose.model("Order", order);

module.exports = Order;
