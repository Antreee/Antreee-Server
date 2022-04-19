
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");
const Item = require("../models/item.model");
const User = require('../models/user.model')


const domino = {
   _id: "625a63636ab2f903486ecc74",
  name: "Domino's Pizza",
  logoUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/1200px-Domino%27s_pizza_logo.svg.png',
  cuisine: ['Italian', 'western', 'Pizza'],
  address:
    'No 54 55 Komplek OCBC, Kel, Jl. Ring Road, Asam Kumbang, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20133',
  location: {
    type: 'Point',
    coordinates: [98.62642393507853, 3.565190444761281],
  },
  contactNumber: '1500366',
  available: true,
  mainImagesUrl: [
    'https://cdn4.singleinterface.com/files/outlet/outlet_facebook_images/outlet_cover_photo/63667/banner_5_1_jpg.jpg',
    'http://node-img.qraved.com/image/data/Indonesia/Jakarta/Medan_Satria/Domino_s_Pizza/menu1.jpg?size=s',
  ],
  adminId: '62591472c985497bca029f6f',
}
const pepperLunch = {
  name: 'Pepper Lunch',
  logoUrl:
    'https://pacificplace.b-cdn.net/directory_image/rr0nB/fnb-pepper-lunch.png',
  cuisine: ['Western', 'Asian'],
  address:
    'HJ8G+R6H, Asam Kumbang, Medan Selayang, Medan City, North Sumatra 20122',
  location: {
    type: 'Point',
    coordinates: [98.62546494915908, 3.567298860693729],
  },
  contactNumber: '(061) 80501749',
  available: true,
  mainImagesUrl: [
    'https://lh5.googleusercontent.com/p/AF1QipMwboKvWtPXSVmMNUBc7TXxHncwV9F0QJ4WITpH=w1080-k-no',
    'https://hargamenu.net/wp-content/uploads/2017/11/Daftar-Harga-Menu-Pepper-Lunch-November-2017.png',
  ],
  adminId: '625918b7fe08008bfe451aae',
}
beforeAll(async () => {

    await mongoose.connect("mongodb://localhost:27017/test_NuerPay");
   await Restaurant.create(domino)
  await Restaurant.create(pepperLunch)
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

});

describe('- Success Get Restaurants -', () => {
  it('Should Get All Restaurants', async () => {
    const res = await request(app)
      .get('/restaurants')
      .set('coordinates', '98.62546494915908,3.567298860693729')
    console.log('res: ', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    res.body.forEach((restaurant) => {
      expect(restaurant).toHaveProperty('_id', expect.any(String))
      expect(restaurant).toHaveProperty('name', expect.any(String))
      expect(restaurant).toHaveProperty('address', expect.any(String))
      expect(restaurant).toHaveProperty('adminId', expect.any(String))
      expect(restaurant).toHaveProperty('available', expect.any(Boolean))
      expect(restaurant).toHaveProperty('contactNumber', expect.any(String))
      expect(restaurant.cuisine).toBeInstanceOf(Array)
      expect(restaurant.location).toBeInstanceOf(Object)
      expect(restaurant.location).toHaveProperty('coordinates')
      expect(restaurant).toHaveProperty('logoUrl', expect.any(String))
      expect(restaurant.mainImagesUrl).toBeInstanceOf(Array)
    })
  })
  
 it('Should Get Restaurant by Admin ID', async () => {
    const payload = {
      email: 'domino@admin.com',
      password: 'domino',
    }
    const loginResponse = await request(app).post('/admin/login').send(payload)
    const access_token = loginResponse.body.access_token
    const res = await request(app)
      .get('/restaurants/admin')
      .set('access_token', access_token)
    expect(res.status).toBe(200)
    expect(res.body[0]).toBeInstanceOf(Object)
    expect(res.body[0]).toMatchObject(domino)
    expect(res.body[0]).toHaveProperty('_id', expect.any(String))
    expect(res.body[0]).toHaveProperty('name', expect.any(String))
    expect(res.body[0]).toHaveProperty('address', expect.any(String))
    expect(res.body[0]).toHaveProperty('adminId', expect.any(String))
    expect(res.body[0]).toHaveProperty('available', expect.any(Boolean))
    expect(res.body[0]).toHaveProperty('contactNumber', expect.any(String))
    expect(res.body[0].cuisine).toBeInstanceOf(Array)
    expect(res.body[0].location).toBeInstanceOf(Object)
    expect(res.body[0].location.coordinates).toStrictEqual([
      98.62642393507853, 3.565190444761281,
    ])
    expect(res.body[0]).toHaveProperty('logoUrl', expect.any(String))
    expect(res.body[0].mainImagesUrl).toBeInstanceOf(Array)
  })
  
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
  await User.deleteMany();
  await mongoose.disconnect();
});

