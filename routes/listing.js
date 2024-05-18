const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");

const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloud-configuration.js");
const upload = multer({storage});

// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// Routes for handling CRUD operations on listings
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));

router.route("/:id")
.put(isLoggedIn ,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing))
.get(wrapAsync(listingController.showListing))
.delete(isLoggedIn ,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.editListing));

module.exports = router;