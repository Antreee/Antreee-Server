const router = require("express").Router();
const AuthController = require("../controllers/authController");

// router.post("/register", AuthController.registerAdmin);
router.post("/login", AuthController.login);

module.exports = router;
