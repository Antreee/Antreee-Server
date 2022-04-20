const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");

class OrderController {
  // static async fetchOrder(req, res, next) {
  // 	try {
  // 		const order = await Order.find();
  // 		res.status(200).json(order);
  // 	} catch (error) {
  // 		console.log(error);
  // 		next(error)
  // 	}
  // }
  static async fetchOrderById(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order)
        throw {
          name: "NotFound",
          message: "Order not found",
        };
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderController;
