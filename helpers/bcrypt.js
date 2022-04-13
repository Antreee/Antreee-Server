const bcrypt = require("bcrypt");

async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };
