const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");
const Item = require("../models/item.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

const domino = {
  _id: "625a63636ab2f903486ecc74",
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
};
const pepperLunch = {
  _id: "625a63636ab2f903486ecc75",
  name: "Pepper Lunch",
  logoUrl:
    "https://pacificplace.b-cdn.net/directory_image/rr0nB/fnb-pepper-lunch.png",
  cuisine: ["Western", "Asian"],
  address:
    "HJ8G+R6H, Asam Kumbang, Medan Selayang, Medan City, North Sumatra 20122",
  location: {
    type: "Point",
    coordinates: [98.62546494915908, 3.567298860693729],
  },
  contactNumber: "(061) 80501749",
  available: true,
  mainImagesUrl: [
    "https://lh5.googleusercontent.com/p/AF1QipMwboKvWtPXSVmMNUBc7TXxHncwV9F0QJ4WITpH=w1080-k-no",
    "https://hargamenu.net/wp-content/uploads/2017/11/Daftar-Harga-Menu-Pepper-Lunch-November-2017.png",
  ],
  adminId: "625918b7fe08008bfe451aae",
};
beforeAll(async () => {

  
	await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
	await Restaurant.create(domino);
	await Restaurant.create(pepperLunch);
	await Item.create({
		name: "NewYorker Alfredo Beef Mushroom Truffle",
		price: 80910,
		description:
			"Roti pizza dengan ketebalan sedang, Lembut di bagian dalam namun renyah di bagian luar, Truffle Alfredo Sauce, Keju Mozzarella, Beef Burger, Onion, Jamur Champignon, Keju Parmesan, Parsley",
		imageUrl:
			"https://dom-repo-olo-prod.oss-ap-southeast-5.aliyuncs.com/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/n/e/newyorkeralfredobeefmushroomtrufflebig.png",
		restaurantId: "625a63636ab2f903486ecc74",
		categoryItem: "food",
	});
	await User.create({
		email: "domino@admin.com",
		password: "domino",
		fullName: "asep surasep",
		phoneNumber: "123456789",
		role: "admin",
		profilePicture:
			"https://media-exp1.licdn.com/dms/image/C5103AQEufX4pz82prg/profile-displayphoto-shrink_200_200/0/1545135546054?e=1654732800&v=beta&t=3gTVvR8cwaghNeUbQJTfm9uPPKj3c2xZNlXPeFoyi7g",
		_id: "62591472c985497bca029f6f",
	});
	await Order.create({
		customerName: "adit19",
		customerPhoneNumber: "083647584938",
		customerEmail: "adit@mail.com",
		tableNumber: "A-12",
		totalPrice: 500000,
		bookingDate: "",
		numberOfPeople: "",
		status: "Unpaid",
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
});

describe("- Success Get Restaurants -", () => {
  it("Should Get All Restaurants", async () => {
    const res = await request(app)
      .get("/restaurants")
      .set("coordinates", "98.62546494915908,3.567298860693729");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((restaurant) => {
      expect(restaurant).toHaveProperty("_id", expect.any(String));
      expect(restaurant).toHaveProperty("name", expect.any(String));
      expect(restaurant).toHaveProperty("address", expect.any(String));
      expect(restaurant).toHaveProperty("adminId", expect.any(String));
      expect(restaurant).toHaveProperty("available", expect.any(Boolean));
      expect(restaurant).toHaveProperty("contactNumber", expect.any(String));
      expect(restaurant.cuisine).toBeInstanceOf(Array);
      expect(restaurant.location).toBeInstanceOf(Object);
      expect(restaurant.location).toHaveProperty("coordinates");
      expect(restaurant).toHaveProperty("logoUrl", expect.any(String));
      expect(restaurant.mainImagesUrl).toBeInstanceOf(Array);
    });
  });

  it("Should Get Restaurant by Admin ID", async () => {
    const payload = {
      email: "domino@admin.com",
      password: "domino",
    };
    const loginResponse = await request(app).post("/admin/login").send(payload);
    const access_token = loginResponse.body.access_token;
    const res = await request(app)
      .get("/restaurants/admin")
      .set("access_token", access_token);
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeInstanceOf(Object);
    expect(res.body[0]).toMatchObject(domino);
    expect(res.body[0]).toHaveProperty("_id", expect.any(String));
    expect(res.body[0]).toHaveProperty("name", expect.any(String));
    expect(res.body[0]).toHaveProperty("address", expect.any(String));
    expect(res.body[0]).toHaveProperty("adminId", expect.any(String));
    expect(res.body[0]).toHaveProperty("available", expect.any(Boolean));
    expect(res.body[0]).toHaveProperty("contactNumber", expect.any(String));
    expect(res.body[0].cuisine).toBeInstanceOf(Array);
    expect(res.body[0].location).toBeInstanceOf(Object);
    expect(res.body[0].location.coordinates).toStrictEqual([
      98.62642393507853, 3.565190444761281,
    ]);
    expect(res.body[0]).toHaveProperty("logoUrl", expect.any(String));
    expect(res.body[0].mainImagesUrl).toBeInstanceOf(Array);
  });

  describe("- Success Get Restaurant Item By Restaurant Id -", () => {
    it("get restaurant item by restaurant id - success get restaurant", async () => {
      const res = await request(app).get(
        "/restaurants/625a63636ab2f903486ecc74/items"
      );
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", res.body.message);
      expect(res.body).toHaveProperty("item", expect.any(Array));
    });
  });

  describe("- Success update Restaurant Availability -", () => {
	const user = {
		email: "domino@admin.com",
		password: "domino",
	  };
    const payload = {
      available: false,
    };
    it("patch update Restaurant Availability - success patch restaurant", async () => {
      const loginResponse = await request(app)
        .post("/admin/login")
        .send(user);
      const access_token = loginResponse.body.access_token;
      const res = await request(app)
        .patch("/restaurants/625a63636ab2f903486ecc74")
        .send(payload)
        .set("access_token", access_token);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", res.body.message);
    });
  });
});

  
	describe("- Success Get Restaurant order By Restaurant Id -", () => {
		it("get restaurant order by restaurant id - success get restaurant", async () => {
			const payload = {
				email: "domino@admin.com",
				password: "domino",
			};
			const loginResponse = await request(app)
				.post("/admin/login")
				.send(payload);
			const access_token = loginResponse.body.access_token;
			const res = await request(app)
				.get("/restaurants/625a63636ab2f903486ecc74/orders")
				.set("access_token", access_token);

			expect(res.status).toBe(200);
			expect(res.body).toBeInstanceOf(Object);
			expect(res.body).toHaveProperty("message", expect.any(String));
			expect(res.body).toHaveProperty("message", res.body.message);
			expect(res.body).toHaveProperty("orders", expect.any(Array));
		});
	});


	describe("get restaurant --- failed", () => {
		describe("- fail Get Restaurant Item By Restaurant Id -", () => {
			it("get restaurant item by restaurant id - failed get restaurant", async () => {
				const res = await request(app).get(
					"/restaurants/625a63636ab2f903486ecc75/items"
				);

				expect(res.status).toBe(404);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", res.body.message);
			});
		});

		describe("- fail Get Restaurant orders By Restaurant Id -", () => {
			it("get restaurant order by restaurant id - failed get restaurant", async () => {
				const payload = {
					email: "domino@admin.com",
					password: "domino",
				};
				const loginResponse = await request(app)
					.post("/admin/login")
					.send(payload);
				const access_token = loginResponse.body.access_token;
				const res = await request(app)
					.get("/restaurants/625a63636ab2f903486ecc80/orders")
					.set("access_token", access_token);

				expect(res.status).toBe(404);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", res.body.message);
			});
		});

		describe("- fail Get Restaurant orders By Restaurant Id -", () => {
			it("get restaurant order by restaurant id - failed get restaurant", async () => {
				const payload = {
					email: "domino@admin.com",
					password: "domino",
				};
				const loginResponse = await request(app)
					.post("/admin/login")
					.send(payload);
				const access_token = loginResponse.body.access_token;
				const res = await request(app)
					.get("/restaurants/625a63636ab2f903486ecc80/orders")
					.set(
						"access_token",
						"yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTkxNDcyYzk4NTQ5N2JjYTAyOWY2ZiIsImVtYWlsIjoiZG9taW5vQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1MDM3OTI4NX0.phptXkZr03LDfkg1TFTdMtmXu4LOTqCZu2oVLfwHjBQ"
					);

				expect(res.status).toBe(401);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", res.body.message);
			});
		});
	});
});

describe("Get restaurant --- Success", () => {
	describe("- success Get Restaurant Item By Restaurant Id -", () => {
		it("get restaurant item by restaurant id", async () => {
			const res = await request(app).get(
				"/restaurants/625a63636ab2f903486ecc74"
			);
			const { status, body } = res
			expect(status).toBe(200);
			expect(body).toBeInstanceOf(Object);
		});
	});
});
describe("Get restaurant by id --- Failed", () => {
	it("faill get restaurant by id with wrong id", async () => {
		const res = await request(app).get(
			"/restaurants/ "
		);
		const { status, body } = res
		expect(status).toBe(400);
		expect(body).toBeInstanceOf(Object);
		expect(body).toHaveProperty("message", "Invalid restaurant id");
	});
	it("faill get restaurant by id with wrong id", async () => {
		const res = await request(app).get(
			"/restaurants/123sdfbf34er45"
		);
		const { status, body } = res
		expect(status).toBe(400);
		expect(body).toBeInstanceOf(Object);
		expect(body).toHaveProperty("message", "Invalid restaurant id");
	});
});

afterAll(async () => {
	await Restaurant.deleteMany();
	await User.deleteMany();
	await Order.deleteMany();
	await mongoose.disconnect();
});
