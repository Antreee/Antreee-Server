const Restaurant = require("../models/restaurant.model");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");
const Item = require("../models/item.model");

class RestaurantController {
  // static async createRestaurant(req, res, next) {
  // 	try {
  // 		const {
  // 			name,
  // 			logoUrl,
  // 			address,
  // 			cuisine,
  // 			location,
  // 			contactNumber,
  // 			available,
  // 			mainImagesUrl,
  // 			adminId,
  // 		} = req.body;
  // 		const restaurant = await Restaurant.create({
  // 			name,
  // 			logoUrl,
  // 			address,
  // 			cuisine,
  // 			location,
  // 			contactNumber,
  // 			available,
  // 			mainImagesUrl,
  // 			adminId,
  // 		});
  // 		res.status(201).json({
  // 			message: "Restaurant created successfully",
  // 			restaurant,
  // 		});
  // 	} catch (err) {
  // 		next(err);
  // 	}
  // }

  static async fetchRestaurant(req, res, next) {
    try {
      let { coordinates } = req.headers;

      let splitted = coordinates.split(",");
      const restaurant = await Restaurant.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [+splitted[0], +splitted[1]],
            },
            distanceField: "restaurantDistance",
            $maxDistance: 1000,
            spherical: true,
          },
        },
      ]);
      res.status(200).json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  static async fetchRestaurantById(req, res, next) {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      res.status(200).json(restaurant);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateRestaurantAvailability(req, res, next) {
    try {
      const { available } = req.body;
      const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
        available,
      });
      res.status(200).json({
        message: "Restaurant availability updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getRestaurantByAdminId(req, res, next) {
    try {
      const restaurant = await Restaurant.find({
        adminId: req.currentUser.id,
      });
      res.status(200).json(restaurant);
    } catch (error) {
      next(error);
    }
  }

	static async getOrdersByRestaurantId(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				throw {
					code: 404,
					name: "NotFound",
					message: "not found",
				};
			}
			const orders = await Order.find({
				restaurantId: id,
				status: "Unpaid" || "PAID",
			});
			if (orders.length == 0) {
				throw {
					code: 404,
					name: "NotFound",
					message: "not found",
				};
			}
			res
				.status(200)
				.json({ message: "Orders retrieved successfully", orders });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}


  // static async getBookedByRestaurantId(req, res, next) {
  // 	try {
  // 		const orders = await Order.find({
  // 			restaurantId: req.params.id,
  // 			status: "Booked",
  // 		});
  // 		res.status(200).json(orders);
  // 	} catch (error) {
  // 		next(error);
  // 	}
  // }

  static async getItemByRestaurantId(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw {
          code: 404,
          name: "NotFound",
          message: "not found",
        };
      }
      const item = await Item.find({ restaurantId: id });
      if (item.length == 0) {
        throw {
          code: 404,
          name: "NotFound",
          message: "not found",
        };
      }
      res.status(200).json({
        message: "Food retrieved successfully",
        item,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RestaurantController;
