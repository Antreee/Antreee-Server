const moongose = require("mongoose");
const connection = moongose.createConnection("process.env.MONGO_URI");

module.exports = connection;
