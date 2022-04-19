const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");
const Item = require("../models/item.model");

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
    const restaurant = await Restaurant.create({
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
    });
    const item = await Item.create({
      name: "NewYorker Alfredo Beef Mushroom Truffle",
      price: 80910,
      description:
        "Roti pizza dengan ketebalan sedang, Lembut di bagian dalam namun renyah di bagian luar, Truffle Alfredo Sauce, Keju Mozzarella, Beef Burger, Onion, Jamur Champignon, Keju Parmesan, Parsley",
      imageUrl:
        "https://dom-repo-olo-prod.oss-ap-southeast-5.aliyuncs.com/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/n/e/newyorkeralfredobeefmushroomtrufflebig.png",
      restaurantId: "625a63636ab2f903486ecc74",
      categoryItem: "food",
    });
    console.log(restaurant, item);
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
});

afterAll(async () => {
  // const database = client.db("palmsBallroom");
  // const ballroom = database.collection("ballrooms");
  // await ballroom.deleteMany({})
  await Restaurant.deleteMany();
  await mongoose.disconnect();
});
