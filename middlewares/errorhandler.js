module.exports = (err, req, res, next) => {
	console.log("congrats you hit the error middleware");
	console.log(err.name, "<<<", err, "<<<");
	if (err.name === "ValidationError") {
		let errors = Object.values(err.errors).map((el) => el.message);
		let fields = Object.values(err.errors).map((el) => el.path);
		let code = 400;
		// if (errors.length > 1) {
		// 	const formattedErrors = errors.join("");
		// 	res
		// 		.status(code)
		// 		.send({ messages: formattedErrors, fields: `${fields} is required` });
		// } else {
		res
			.status(code)
			.send({ messages: errors, fields: `${fields} is required` });
		// }
		// } else if (err.code && err.code == 11000) {
		// 	const field = Object.keys(err.keyValue);
		// 	const code = 409;
		// 	const error = `An account with that ${field} already exists.`;
		res.status(code).send({ messages: error, fields: field });
	} else if (err.message === "Invalid email or password")
		return res.status(400).send({ message: err.message });
	else if (err.name === "InvalidUser")
		return res.status(401).send({ message: err.message });
	else if (err.name === "NotFound")
		return res.status(404).send({ message: err.message });
	else if (err.name === "BadRequest")
		return res.status(400).send({ message: err.message });
	else if (err.name === "BSONTypeError")
		return res.status(400).send({ message: "Invalid order id" });
	else if (err.name === "JsonWebTokenError")
		return res.status(401).send({ message: "Invalid Token" });
	else if (err.name === "CastError")
		return res.status(400).send({ message: "Invalid restaurant id" });
	else if (err.name === "TypeError")
		return res.status(400).send({ message: "Invalid restaurant id" });
	else return res.status(500).send("An unknown error occurred.");
};
