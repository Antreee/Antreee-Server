const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("../models/user.model");

class AuthController {
	static async registerAdmin(req, res, next) {
		try {
			const { fullName, email, password, phoneNumber, profilePicture } =
				req.body;
			console.log(`masuk`, req.body);
			const user = await User.create({
				fullName,
				email,
				password,
				phoneNumber,
				profilePicture,
				role: "admin",
			});
			res.status(201).json({
				status: "success",
				data: {
					user,
				},
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = AuthController;
