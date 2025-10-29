const expres = require("express");
const router= expresss.Router("./Controllers/paystackController");
const{ initializePayment } = require("")

router.post("/initialize", intializePayment);

module.exports = router;