const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");

beforeAll(async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
		const restaurant = await Restaurant.create({
			name: "Domino's Pizza",
			logoUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/1200px-Domino%27s_pizza_logo.svg.png",
			cuisine: ["Italian", "western", "Pizza"],
			address:
				"No 54 55 Komplek OCBC, Kel, Jl. Ring Road, Asam Kumbang, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20133",
			location: {
				type: "Point",
				coordinates: [98.62642393507853, 3.565190444761281],
			},
			contactNumber: "1500366",
			available: true,
			mainImagesUrl: [
				"https://cdn4.singleinterface.com/files/outlet/outlet_facebook_images/outlet_cover_photo/63667/banner_5_1_jpg.jpg",
				"http://node-img.qraved.com/image/data/Indonesia/Jakarta/Medan_Satria/Domino_s_Pizza/menu1.jpg?size=s",
			],
			adminId: "62591472c985497bca029f6f",
		});
		console.log(restaurant);
	} catch (err) {
		console.log(err);
	}
});

describe("get restaurant", () => {
	describe("- success get restaurant -", () => {
		it("get restaurant - success get restaurant", async () => {
			const payload = {
				coordinates: "98.628043,3.573613",
			};
			const res = await request(app)
				.get("/restaurants")
				.set("coordinates", "98.628043,3.573613");
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
	// await Restaurant.deleteMany();
	await mongoose.disconnect();
});
