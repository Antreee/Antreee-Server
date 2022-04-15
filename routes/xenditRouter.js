const router = require("express").Router();
const xenditController = require("../controllers/xenditController")

router.post("/pays", xenditController.xenditInvoice);
router.post("/callBack", xenditController.xenditCallBack);

module.exports = router;