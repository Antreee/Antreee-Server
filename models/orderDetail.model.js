const mongoose = require("mongoose");
const connection = require("../config/mongodb");
// const Order = require("./order.model");
const Food = require("./food.model")

const orderDetail = new mongoose.Schema({
	// orderId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: Order,
	// 	required: true,
	// 	index: true,
	// },
	foodId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Food,
		required: true,
		index: true,
	},
	quantity: {
		type: Number,
	},
});

const OrderDetail = connection.model("OrderDetail", orderDetail);

module.exports = OrderDetail;