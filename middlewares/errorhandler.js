//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists.`;
	res.status(code).send({ messages: error, fields: field });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
	console.log(err, res, "{{====={{====")
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
		console.log(err, "<<<");
		if (err.name === "ValidationError")
			return (err = handleValidationError(err, res));
		if (err.code && err.code == 11000)
			return (err = handleDuplicateKeyError(err, res));
		if (err.message === "Invalid email or password")
			return res.status(400).send({ message: err.message });
		return (err = handleDuplicateKeyError(err, res));
	} catch (err) {
		res.status(500).send("An unknown error occurred.");
	}
};
