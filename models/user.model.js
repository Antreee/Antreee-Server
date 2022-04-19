const mongoose = require("mongoose");
// const connection = require("../config/mongodb");
const { isEmail } = require("validator");
const { hashPassword } = require("../helpers/bcrypt");

const userScema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [isEmail, "Invalid email"],
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
});

userScema.pre("save", async function (next) {
	try {
		this.password = await hashPassword(this.password);
		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
});

const User = mongoose.model("user", userScema);

module.exports = User;
