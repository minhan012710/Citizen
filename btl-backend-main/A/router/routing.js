const express = require("express")
const router = express.Router();
const adminController = require("../controller/adminController");
const authen = require("../middleware/authen");
const admin = require("../models/admin");



router.post(
    "/create",
    authen.authentication,
    authen.checkPermission,
    adminController.CreateAccount
);
router.post(
    "/login",
    adminController.loginUser
);
router.post(
    "/updateWorkSession", 
    authen.authentication,
    authen.checkPermission,
    adminController.updateWorkSession
);
router.post(
    "/searchSubordinates", 
    authen.authentication, 
    adminController.searchSubordinates
);

module.exports = router
