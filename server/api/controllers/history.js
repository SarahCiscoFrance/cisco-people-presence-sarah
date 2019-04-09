const mongoose = require("mongoose");

const historyModel = require("../models/history");

exports.createNewHistory = (codecMacAddress, date, name, value) => {
  const history = new historyModel({
    _id: new mongoose.Types.ObjectId(),
    codecMacAddress,
    name,
    value,
    date
  });

  history.save().catch(err => console.error(err));
};

exports.getCodecHistory = (req, res) => {
  historyModel
    .find({
      codecMacAddress: req.body.codecMacAddress,
      date: { $gte: req.body.startDate, $lt: req.body.endDate }
    })
    .exec()
    .then(data => {
      res.status(200).json({
        count: data.length,
        history: data
      });
    })
    .catch(err => sendError(err, res));
};

const sendError = (err, res) => {
  console.error(err);
  res.status(500).json({
    error: err
  });
};
