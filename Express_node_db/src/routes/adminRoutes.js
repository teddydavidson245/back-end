const express = require("express");
const router = express.Router();
const {getAdmin, getSingleAdmin, newAdmin, login} = require("../controllers/adminController.js/adminController.js")

router.get("/admin", getAdmin);
router.get("/admin/:id", getSingleAdmin);
router.post("/admin", newAdmin);
router.post("/login", login);

module.exports = router;