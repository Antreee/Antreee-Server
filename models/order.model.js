const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const OrderDetail = require("./orderDetail.model");

const order = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhoneNumber: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
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

  orderDetails: [{
      ref: OrderDetail,
      type: mongoose.Schema.Types.ObjectId,
  }],
});

const Order = connection.model("Order", order);

module.exports = Order;
