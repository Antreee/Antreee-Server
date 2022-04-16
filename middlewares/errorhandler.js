function errorHandler(err, req, res, next) {
	console.log(err);
	if (err.name === "MongoServerError" && err.code === 11000) {
		err.message = "Email already exists";
	}
	if (err.name === "ValidationError") {
		const messages = Object.values(err.errors).map((val) => val.message);
		const fields = Object.values(err.errors).map((val) => val.path);
		err.message = messages || fields;
	}
	res.status(err.code || 500).json({
		status: "error",
		message: err.message || "Internal server error",
	});
}

module.exports = errorHandler;
