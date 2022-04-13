const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/", UserController.createUser)
router.get("/", UserController.fetchUsers)
router.get("/:id", UserController.findUser)
router.delete("/:id", UserController.deleteUser)
router.put("/:id", UserController.updateUser)

module.exports = router;
