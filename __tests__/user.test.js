const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
		const admin = await User.create({
			email: "domino@admin.com",
			password: hashPassword("domino"),
			fullName: "asep surasep",
			phoneNumber: "123456789",
			role: "admin",
			profilePicture:
				"https://media-exp1.licdn.com/dms/image/C5103AQEufX4pz82prg/profile-displayphoto-shrink_200_200/0/1545135546054?e=1654732800&v=beta&t=3gTVvR8cwaghNeUbQJTfm9uPPKj3c2xZNlXPeFoyi7g",
			_id: "62591472c985497bca029f6f",
		});

		// const insertBallroom = await ballroom.insertMany(data);
		console.log(admin, 100000000000000);
	} catch (error) {
		console.log(error);
	}
});

describe("login admin", () => {
	describe("- success login admin -", () => {
		it("POST login - success login", async () => {
			const payload = {
				email: "domino@admin.com",
				password: "domino",
			};

			const res = await request(app).post("/admin/login").send(payload);
			console.log("res: ", res);
			expect(res.status).toBe(200);
			// expect(res.body).toBeInstanceOf(Array);
			// expect(res.body.length).toBeGreaterThanOrEqual(20);
		});
	});
});

afterAll(async () => {
	// const database = client.db("palmsBallroom");
	// const ballroom = database.collection("ballrooms");
	// await ballroom.deleteMany({})
	// await User.deleteMany();
	await mongoose.disconnect();
});
