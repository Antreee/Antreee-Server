const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
mongoose.createConnection(process.env.MONGO_URI_TEST);
const User = require("../models/user.model");
