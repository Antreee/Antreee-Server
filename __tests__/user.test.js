const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");

beforeAll(async () => {
	jest.setTimeout(90 * 1000)
	try {
		await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
		const admin = await User.create({
			email: "domino@admin.com",
			password: "domino",
			fullName: "asep surasep",
			phoneNumber: "123456789",
			role: "admin",
			profilePicture:
				"https://media-exp1.licdn.com/dms/image/C5103AQEufX4pz82prg/profile-displayphoto-shrink_200_200/0/1545135546054?e=1654732800&v=beta&t=3gTVvR8cwaghNeUbQJTfm9uPPKj3c2xZNlXPeFoyi7g",
			_id: "62591472c985497bca029f6f",
		});
	} catch (error) {
		console.log(error < "ini ereor di test nya");
	}
});


describe("login admin success", () => {
	it("POST login - success login", async () => {
		const payload = {
			email: "domino@admin.com",
			password: "domino",
		};
		const res = await request(app).post("/admin/login").send(payload);
		const { status, body } = res;
		expect(status).toBe(200);
		expect(body).toHaveProperty("access_token", expect.any(String));
	});
});
describe("login admin fail", () => {
	it("POST login - Fail login with no email", async () => {
		const payload = {
			email: "",
			password: "domino",
		};
		const res = await request(app).post("/admin/login").send(payload);
		const { status, body } = res;
		expect(status).toBe(400);
		expect(body).toHaveProperty("message", expect.any(String));
		expect(body).toHaveProperty("message", "Invalid email or password");
	});
	it("POST login - Fail login wrong email", async () => {
		const payload = {
			email: "wrongmail@mail.com",
			password: "domino",
		};
		const res = await request(app).post("/admin/login").send(payload);
		const { status, body } = res;
		expect(status).toBe(400);
		expect(body).toHaveProperty("message", expect.any(String));
		expect(body).toHaveProperty("message", "Invalid email or password");
	});
	it("POST login - Fail login wrong password", async () => {
		const payload = {
			email: "domino@admin.com",
			password: "dominowrongway",
		};
		const res = await request(app).post("/admin/login").send(payload);
		const { status, body } = res;
		expect(status).toBe(400);
		expect(body).toHaveProperty("message", expect.any(String));
		expect(body).toHaveProperty("message", "Invalid email or password");
	});
	it("POST login - Fail login with no password", async () => {
		const payload = {
			email: "domino@admin.com",
			password: "",
		};
		const res = await request(app).post("/admin/login").send(payload);
		const { status, body } = res;
		expect(status).toBe(400);
		expect(body).toHaveProperty("message", expect.any(String));
		expect(body).toHaveProperty("message", "Invalid email or password");
	});
});



// test("404 Failed login with no email - should return error", (done) => {
// 	request(app)
// 		.post("/login")
// 		.send({
// 			email: "",
// 			password: "domino",
// 		})
// 		.end((err, res) => {
// 			if (err) return done(err);
// 			const { status } = res;
// 			expect(status).toBe(404);
// 			return done();
// 		});
// });
// it("404 Failed login wrong email - should return error", (done) => {
// 	jest.setTimeout(6000)
// 	request(app)
// 		.post("/admin/login")
// 		.send({
// 			email: "emailwrong@mail.com",
// 			password: "domino",
// 		})
// 		.end((err, res) => {
// 			if (err) return done(err);
// 			const { body, status } = res;
// 			console.log("🚀 ~ file: user.test.js ~ line 58 ~ .end ~ body", body)
// 			expect(status).toBe(404);
// 			return done();
// 		});
// });
// test("404 Failed login wrong password - should return error", (done) => {
// 	request(app)
// 		.post("/login")
// 		.send({
// 			email: "domino@admin.com",
// 			password: "wrongpassword",
// 		})
// 		.end((err, res) => {
// 			if (err) return done(err);
// 			const { status } = res;
// 			expect(status).toBe(404);
// 			return done();
// 		});
// });
// test("404 Failed login with no password - should return error", (done) => {
// 	request(app)
// 		.post("/login")
// 		.send({
// 			email: "domino@admin.com",
// 			password: "",
// 		})
// 		.end((err, res) => {
// 			if (err) return done(err);
// 			const { status } = res;
// 			expect(status).toBe(404);
// 			return done();
// 		});
// });


afterAll(async () => {
	await User.deleteMany();
	await mongoose.disconnect();
});
