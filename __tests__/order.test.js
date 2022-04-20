const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");

beforeAll(async () => {
	await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
});

describe("get order by id", () => {
	describe("GET/ orders / :id - success", () => {
		it("should return a string with status 200", async () => {
			const order = await request(app)
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
					status: "Unpaid",
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
			// console.log(order.body.orderId, 6666666666666);
			const res = await request(app).get(`/orders/${order.body.orderId}`);
			expect(res.status).toBe(200);
			expect(res.body).toBeInstanceOf(Object);
		});
	});
	describe("GET/ orders / :id - fail", () => {
		it("should return a string with status 400", async () => {
			const order = await request(app)
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
					status: "Unpaid",
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
			// console.log(order.body.orderId, 6666666666666);
			const res = await request(app).get(`/orders/$`);
			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("message");
		});
		it("should return a string with status 404", async () => {
			const order = await request(app)
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
					status: "Unpaid",
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
			const res = await request(app).get(`/orders/625eb944bb8da1361d1f5981`);
			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty("message");
		});
	});
});

afterAll(async () => {
	await Order.deleteMany();
	await OrderDetail.deleteMany();
	await mongoose.disconnect();
});
