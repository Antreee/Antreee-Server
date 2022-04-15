const axios = require("axios");

class XenditController {
  static async xenditCallBack(req, res) {
    try {
      await Transaction.update(
        {
          status: req.body.status,
        },
        {
          where: {
            xenditInvoiceId: req.body.id,
          },
        }
      );

      res.status(200).json({
        message: "Successfully accepted the callback",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async xenditInvoice(req, res) {
    try {
      let response = await axios.post(
        "https://api.xendit.co/v2/invoices",
        req.body,
        {
          headers: {
            Authorization: process.env.XENDIT_KEY,
          },
        }
      );
      let responseUrl = response.data.invoice_url;

      await Transaction.create({
        xenditInvoiceId: response.data.id,
        amount: req.body.amount,
        customerName: req.body.customer.given_names,
        customerEmail: req.body.customer.email,
        status: response.data.status,
      });

      res.status(200).json(responseUrl);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = XenditController;
