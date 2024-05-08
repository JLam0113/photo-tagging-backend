const express = require('express');
const character_controller = require("../controllers/characterController")
const router = express.Router();

/* GET home page. */
router.get("/character", character_controller.get);


module.exports = router;
