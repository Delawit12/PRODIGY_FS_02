const express = require("express");
const userController = require("../controllers/userController.js");
// const auth = require("../Middleware/authorization.js");
const router = express.Router();
router.route("/").post(userController.register).get(userController.getAllUser);
router.post("/login", userController.login);
router.post("/forgetPassword", userController.forgetPassword);
router.post("/confirmOTP", userController.confirmOTP);
router.post("/passwordReset", userController.passwordReset);
router.post("/updateUser", userController.updateUser);
router.post("/removeUser", userController.removeUser);

module.exports = router;
