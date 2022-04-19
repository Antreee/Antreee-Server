const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");

let orderId;

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
    await Order.create({
      customerName: "adit19",
      customerPhoneNumber: "083647584938",
      customerEmail: "adit@mail.com",
      tableNumber: "A-12",
      totalPrice: 500000,
      bookingDate: "",
      numberOfPeople: "",
      restaurantId: "625a63636ab2f903486ecc74",
      orderDetails: [
        {
          itemId: "62583b12aa7f55aa593dcacd",
          quantity: 100,
        },
        {
          itemId: "6257090a69627e5b51c559a6",
          quantity: 99,
        },
      ],
    });
    const data = await Order.find();
    orderId = JSON.stringify(data[0]._id).split(`"`)[1];
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Order.deleteMany();
  await OrderDetail.deleteMany();
  await mongoose.disconnect();
});

describe("callback xendit", () => {
  describe("POST /xendit/callback - success test", () => {
    it("should return a message with status 200", async () => {
      const res = await request(app).post("/xendit/callback").send({
        external_id: orderId,
        status: "PAID",
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Successfully accepted the callback");
    });
  });
  describe("POST /xendit/callback - failed test order id undefined", () => {
    it("should return a message with status 400", async () => {
      const res = await request(app).post("/xendit/callback").send({
        status: "PAID",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Order id is required");
    });
  });
  describe("POST /xendit/callback - failed test order id not found", () => {
    it("should return a message with status 404", async () => {
      const res = await request(app).post("/xendit/callback").send({
        external_id: "625ee9ec17bfb712be7da75e",
        status: "PAID",
      });
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Order not found");
    });
  });
  describe("POST /xendit/callback - failed test order id not valid", () => {
    it("should return a message with status 400", async () => {
      const res = await request(app).post("/xendit/callback").send({
        external_id: "sdfgfdgdsg",
        status: "PAID",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid order id");
    });
  });
});
