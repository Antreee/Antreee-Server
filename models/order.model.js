const mongoose = require("mongoose");
const connection = require("../config/mongodb");
// const OrderDetail = require("./orderDetail.model");

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
  customerEmail: {
    type: String,
    required: true,
  },

  // orderDetails: [{
  //     ref: OrderDetail,
  //     type: mongoose.Schema.Types.ObjectId,
  // }],
});

const Order = connection.model("Order", order);

module.exports = Order;
