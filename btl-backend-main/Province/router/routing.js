const express = require("express")
const router = express.Router();
const provinceController = require("../controller/provinceController");
const authen = require("../../A/middleware/authen")
const data = require('../models/database.json');

router.get(
    "/getProvince",
    authen.authentication,
    provinceController.getProvince
);

router.get(
    "/getDistrict",
    authen.authentication,
    provinceController.getDistrict
);

router.get(
    "/getWard",
    authen.authentication,
    provinceController.getWard
);

router.get(
    "/getResidential",
    authen.authentication,
    provinceController.getResitential
);

router.post(
    "/addProvince",
    authen.authentication,
    authen.checkPermission,
    provinceController.addProvince
)

router.post(
    "/addDistrict",
    authen.authentication,
    authen.checkPermission,
    provinceController.addDistrict
)

router.post(
    "/addWard",
    authen.authentication,
    authen.checkPermission,
    provinceController.addWard
)

router.post(
    "/addResidential",
    authen.authentication,
    authen.checkPermission,
    provinceController.addResidential
)


module.exports = router
