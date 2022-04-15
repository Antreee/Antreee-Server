const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.xendit.co/v2/invoices",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  auth: {
    username: process.env.XENDIT_KEY,
    password: "",
  },
});

module.exports = instance;
