const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const Order = require("./order.model");
const Item = require("./item.model");

const orderDetail = new mongoose.Schema({
	ItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Item,
		required: true,
		index: true,
	},
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Order,
		required: true,
		index: true,
	},
	quantity: {
		type: Number,
	},
});

const OrderDetail = connection.model("OrderDetail", orderDetail);

module.exports = OrderDetail;
