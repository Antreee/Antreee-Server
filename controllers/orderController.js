const Order = require("../models/order.model")

class OrderController {
  static async fetchOrder(req, res) {
    try {
      const order = await Order.find().populate("orderDetails");
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }   
  }
}

module.exports = OrderController;
