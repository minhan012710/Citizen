const express = require("express");
const router = express.Router();
const civilianController = require("../controller/civilianController");
const authen = require("../../A/middleware/authen")

router.post(
    "/informCivilian", 
    authen.authentication, 
    authen.checkPermission,
    civilianController.informCivilian
);
router.post(
    "/searchCivilians", 
    authen.authentication, 
    civilianController.searchCivilian
);
router.post(
    "/reinformCivilian", 
    authen.authentication, 
    authen.checkPermission,
    civilianController.reinformCivilian
);
router.post(
    "/deleteCivilian", 
    authen.authentication, 
    authen.checkPermission,
    civilianController.deleteCivilian
);
router.post("/getCivilianById", authen.authentication, civilianController.getCivilianById);
router.get("/statisticalUser", authen.authentication, civilianController.statisticalUser);

module.exports = router
