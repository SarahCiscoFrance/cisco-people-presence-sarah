const express = require("express");
const router = express.Router();

const historyController = require("../controllers/history");

router.post("/", historyController.getCodecHistory);

module.exports = router;
