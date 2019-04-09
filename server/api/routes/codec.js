module.exports = io => {
  const express = require("express");
  const router = express.Router();

  const codecController = require("../controllers/codec");

  router.get("/", codecController.getAllCodecs);

  router.get("/:mac", codecController.getCodec);

  router.post("/room-analytics", (req, res) => {
    codecController.newAnalytic(req, res, io);
  });

  return router;
};
