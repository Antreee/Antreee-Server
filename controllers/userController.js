const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");
const User = require("../models/user.model");

class UserController {
  static async createUser(req, res) {
    try {
      const { fullName, email, password, phoneNumber, profilePicture } =
        req.body;

      const users = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        profilePicture,
        role: "Customers",
      });

      res.status(201).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async findUser(req, res) {
    try {
      const { id } = req.params;
      const users = await User.findById(id);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const users = await User.findById(id);
      if (!users) {
        console.log("user not found");
      } else {
        await User.deleteOne();
        res.status(200).json({ message: "User success deleted" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { fullName, email, password, phoneNumber, profilePicture } =
        req.body;
      const users = await User.findById(id);
      if (!users) {
        console.log("user not found");
      } else {
        const updateUser = await User.updateOne({
          fullName,
          email,
          password,
          phoneNumber,
          profilePicture,
        });
        res.status(200).json({ message: "User success updated" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async order(req, res) {
    try {
      const {
        customerName,
        customerPhoneNumber,
        tableNumber,
        totalPrice,
        bookingDate,
        numberOfPeople,
        orderDetails,
      } = req.body;

      const createOrderDetails = await OrderDetail.create(...orderDetails);

      const order = await Order.create({
        customerName,
        customerPhoneNumber,
        tableNumber,
        totalPrice,
        bookingDate,
        numberOfPeople,
        status: "Unpaid",
        orderDetails: createOrderDetails,
      });

      res.status(201).json({ message: "Order Created" });
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = UserController;
