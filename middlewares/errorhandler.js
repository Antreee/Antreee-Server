const { JsonWebTokenError } = require("jsonwebtoken");

//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists.`;
	res.status(code).send({ messages: error, fields: field });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
	let errors = Object.values(err.errors).map((el) => el.message);
	let fields = Object.values(err.errors).map((el) => el.path);
	let code = 400;
	if (errors.length > 1) {
		const formattedErrors = errors.join("");
		res
			.status(code)
			.send({ messages: formattedErrors, fields: `${fields} is required` });
	} else {
		res
			.status(code)
			.send({ messages: errors, fields: `${fields} is required` });

	}
};

module.exports = (err, req, res, next) => {
	try {
		console.log("congrats you hit the error middleware");
		console.log(err.name, "<<<", err, "<<<");
		if (err.name === "ValidationError")
			return (err = handleValidationError(err, res));
		if (err.code && err.code == 11000)
			return (err = handleDuplicateKeyError(err, res));
		if (err.message === "Invalid email or password")
			return res.status(400).send({ message: err.message });
		if (err.name === "InvalidUser")
			return res.status(401).send({ message: err.message });
		if (err.name === "NotFound")
			return res.status(404).send({ message: err.message });
		if (err.name === "BadRequest")
			return res.status(400).send({ message: err.message });
		if (err.name === "BSONTypeError")
			return res.status(400).send({ message: "Invalid order id" });
		if (err.name === "JsonWebTokenError")
			return res.status(401).send({ message: "Invalid Token" });
    if (err.name === "CastError") return res.status(400).send({ message: "Invalid restaurant id" });
		if (err.name === "TypeError") return res.status(400).send({ message: "Invalid restaurant id" });
	} catch (err) {
		res.status(500).send("An unknown error occurred.");
	}
};
