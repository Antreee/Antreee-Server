const mongoose = require("mongoose");
const connection = require("../config/mongodb");
const { isEmail } = require("validator");

const users = new mongoose.Schema({
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

const User = connection.model("User", users);

module.exports = User;
