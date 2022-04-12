const moongose = require("mongoose");
const connection = moongose.createConnection(
	"mongodb+srv://doffy13:afterlife13@antreee.9las8.mongodb.net/Antreee"
);

module.exports = connection;
