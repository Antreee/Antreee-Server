const axios = require("axios");
const Order = require("../models/order.model");
const { ObjectId } = require("mongodb");

class XenditController {
  static async xenditCallBack(req, res, next) {
    try {
      const { external_id, status } = req.body;
      if (!external_id)
        throw {
          name: "BadRequest",
          message: "Order id is required",
        };

      ObjectId(external_id);
      const response = await Order.findByIdAndUpdate(
        {
          _id: external_id,
        },
        {
          status: status,
        }
      );

      if (!response)
        throw {
          name: "NotFound",
          message: "Order not found",
        };

      res.status(200).json({
        message: "Successfully accepted the callback",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = XenditController;
