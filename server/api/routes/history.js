const express = require("express");
const router = express.Router();

const historyController = require("../controllers/history");

router.post("/", historyController.getCodecHistory);

router.get("/ping", historyController.ping);

module.exports = router;
