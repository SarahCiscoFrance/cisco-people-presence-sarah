const mongoose = require("mongoose");

const codecModel = require("../models/codec");

const historyController = require("./history");

exports.getAllCodecs = (req, res) => {
  codecModel
    .find()
    .exec()
    .then(data => {
      res.status(200).json({
        count: data.length,
        codecs: data
      });
    })
    .catch(err => sendError(err, res));
};

exports.getCodec = (req, res) => {
  codecModel
    .findOne({ macAddress: req.params.mac })
    .exec()
    .then(codec => {
      if (!codec) {
        return res.status(404).json({
          message: "Codec not found"
        });
      }
      res.status(200).json({
        codec: codec
      });
    })
    .catch(err => sendError(err, res));
};

exports.newAnalytic = (req, res, io) => {
  codecModel
    .findOne({ macAddress: req.body.Status.Identification.MACAddress.Value })
    .exec()
    .then(codec => {
      if (!codec) {
        createCodec(req, res, io);
      } else {
        updateCodec(codec, req, res, io);
      }
    })
    .catch(err => sendError(err, res));
};

const createCodec = (req, res, io) => {
  const identification = req.body.Status.Identification;

  const codec = new codecModel({
    _id: new mongoose.Types.ObjectId(),
    name: identification.ProductID.Value,
    macAddress: identification.MACAddress.Value
  });

  codec
    .save()
    .then(newCodec => {
      updateCodec(newCodec, req, res, io);
    })
    .catch(err => sendError(err, res));
};

const updateCodec = (codec, req, res, io) => {
  const roomAnalytics = req.body.Status.RoomAnalytics;

  if (roomAnalytics === undefined) {
    console.log(req.body);
    sendError({ message: "roomAnalytics issue." }, res);
    return;
  }

  let name, value;

  if (roomAnalytics.PeopleCount) {
    codec.peopleCount = roomAnalytics.PeopleCount.Current;

    name = "PeopleCount";
    value = codec.peopleCount;
  } else if (roomAnalytics.PeoplePresence) {
    codec.peoplePresence = roomAnalytics.PeoplePresence;

    name = "PeoplePresence";
    value = codec.peoplePresence;
  } else if (roomAnalytics.AmbientNoise) {
    codec.ambientNoise = roomAnalytics.AmbientNoise.Level.dBA;

    name = "AmbientNoise";
    value = codec.ambientNoise;
  }

  codecModel
    .findOneAndUpdate(
      { macAddress: codec.macAddress },
      {
        $set: {
          peoplePresence: codec.peoplePresence,
          peopleCount: codec.peopleCount,
          ambientNoise: codec.ambientNoise
        }
      }
    )
    .exec()
    .then(originalCodec => {
      res.status(200).json({
        message: "New analytic added"
      });

      io.sockets.emit("newAnalytic", codec);

      createHistory(codec.macAddress, name, value);
    })
    .catch(err => sendError(err, res));
};

const createHistory = (macAddress, name, value) => {
  historyController.createNewHistory(macAddress, new Date(), name, value);
};

const sendError = (err, res) => {
  console.error(err);
  res.status(500).json({
    error: err
  });
};
