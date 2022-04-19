const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("../models/user.model");

class AuthController {
	// static async registerAdmin(req, res, next) {
	// 	try {
	// 		const { fullName, email, password, phoneNumber, profilePicture } = req.body;
	// 		const user = await User.create({
	// 			fullName,
	// 			email,
	// 			password,
	// 			phoneNumber,
	// 			profilePicture,
	// 			role: "admin",
	// 		});
	// 		res.status(201).json({
	// 			status: "success",
	// 			data: {
	// 				user,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				throw {
					code: 400,
					message: "Invalid email or password",
				};
			}
			const isMatch = comparePassword(password, user.password);
			if (!isMatch) {
				throw {
					code: 400,
					message: "Invalid email or password",
				};
			}
			const access_token = generateToken({
				id: user._id,
				email: user.email,
				role: user.role,
			});
			res.status(200).json({
				status: "success",
				access_token,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = AuthController;
