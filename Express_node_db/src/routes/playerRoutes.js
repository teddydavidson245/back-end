const express = require("express");
const router = express.Router();
const {
  getPlayers,
  getSinglePlayer,
  createPlayers,
  editSinglePlayer,
} = require("../controllers/adminController.js/playerController.js");

router.get("/players", getPlayers);
router.get("/player/:id", getSinglePlayer);
router.post("/players", createPlayers);
router.put("/player/:id", editSinglePlayer);

module.exports = router;
