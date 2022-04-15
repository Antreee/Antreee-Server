const axios = require("axios");
const Order = require("../models/order.model");

class XenditController {
  static async xenditCallBack(req, res) {
    try {
      const response = await Order.findByIdAndUpdate(
        {
          _id: req.body.external_id,
        },
        {
          status: req.body.status,
        }
      );

      res.status(200).json({
        message: "Successfully accepted the callback",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = XenditController;
