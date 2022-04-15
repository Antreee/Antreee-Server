const router = require("express").Router();
const xenditController = require("../controllers/xenditController");

router.post("/callback", xenditController.xenditCallBack);

module.exports = router;
