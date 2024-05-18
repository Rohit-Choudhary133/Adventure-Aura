const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignUp)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
            passport.authenticate("local",{failureRedirect:"/login", failureFlash:true,}),
            userController.login
);

//Logout
router.get("/logout",userController.logout);


module.exports = router;