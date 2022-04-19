const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Order.deleteMany();
  await OrderDetail.deleteMany();
  await mongoose.disconnect();
});

describe("create order", () => {
  describe("POST /customers/orders - success test without booking date", () => {
    it("should return a string with status 201", async () => {
      const res = await request(app)
        .post("/customers/orders")
        .send({
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
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(String));
    });
  });
  describe("POST /customers/orders - success test with booking date and without order details", () => {
    it("should return 'Booking Success' with status 200", async () => {
      const res = await request(app).post("/customers/orders").send({
        customerName: "adit19",
        customerPhoneNumber: "083647584938",
        customerEmail: "adit@mail.com",
        bookingDate: "19/04/2022 22:52",
        numberOfPeople: "4",
        restaurantId: "625a63636ab2f903486ecc74",
      });
      expect(res.status).toBe(200);
      expect(res.body).toBe("Booking Success");
    });
  });
  describe("POST /customers/orders - failed test without restaurant id", () => {
    it("should return an object with status 400", async () => {
      const res = await request(app).post("/customers/orders").send({
        customerName: "adit19",
        customerPhoneNumber: "083647584938",
        customerEmail: "adit@mail.com",
        bookingDate: "19/04/2022 22:52",
        numberOfPeople: "4",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("messages");
      expect(res.body).toHaveProperty("fields", "restaurantId is required");
      expect(res.body.messages).toBeInstanceOf(Array);
      expect(res.body.messages).toEqual(
        expect.arrayContaining(["Path `restaurantId` is required."])
      );
    });
  });
});
