const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");

class OrderController {
	static async fetchOrder(req, res) {
		try {
			const order = await Order.find();
			res.status(200).json(order);
		} catch (error) {
			console.log(error);
		}
	}

	static async fetchOrderDetails(req, res) {
		try {
			const order = await Order.findById(req.params.id);
			const orderDetails = await OrderDetail.find({ order_Id: req.params.id });
			res.status(200).json({ order });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = OrderController;
