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
  console.log(req.body.Status);
  const roomAnalytics = req.body.Status.RoomAnalytics;
  const PeripheralsRoomAnalytics = req.body.Status.PeripheralsRoomAnalytics;
  const bookings = req.body.Status.Bookings;

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
    codec.ambientNoise = roomAnalytics.AmbientNoise.Level.A; //dBA;

    name = "AmbientNoise";
    value = codec.ambientNoise;
  } else if (roomAnalytics.Sound) {
    codec.drynessScore = roomAnalytics.Sound.Level.A;
    //ANCIEN
    // else if (roomAnalytics.Acoustics) {
    //   codec.drynessScore = roomAnalytics.Acoustics.DrynessScore;

    name = "DrynessScore";
    value = codec.drynessScore;
  }

  let extra_data = []; //for new analytics from room Navigators to be in histories collection

  if (
    PeripheralsRoomAnalytics != undefined &&
    PeripheralsRoomAnalytics.length > 0
  ) {
    codec.navigators = PeripheralsRoomAnalytics;
    PeripheralsRoomAnalytics.forEach(element => {
      if (element.Type == "TouchPanel") {
        extra_data.push({
          name: "AmbianteTemperature",
          value: element.RoomAnalytics.AmbientTemperature
        });

        extra_data.push({
          name: "RelativeHumidity",
          value: element.RoomAnalytics.RelativeHumidity
        });
      } else if (element.Type == "RoomScheduler") {
        extra_data.push({
          name: "AmbianteTemperatureOutdoor",
          value: element.RoomAnalytics.AmbientTemperature
        });

        extra_data.push({
          name: "RelativeHumidityOutdoor",
          value: element.RoomAnalytics.RelativeHumidity
        });
      }
    });
  } else {
    codec.navigators = [];
  }

  if (bookings != undefined && bookings.length > 0) {
    codec.bookings = bookings;
    extra_data.push({
      name: "IsBooked",
      value: true
    });
  } else {
    codec.bookings = [];
  }

  codecModel
    .findOneAndUpdate(
      { macAddress: codec.macAddress },
      {
        $set: {
          peoplePresence: codec.peoplePresence,
          peopleCount: codec.peopleCount,
          ambientNoise: codec.ambientNoise,
          drynessScore: codec.drynessScore,
          navigators: codec.navigators,
          bookings: codec.bookings
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

      extra_data.forEach(d => {
        createHistory(codec.macAddress, d.name, d.value);
      });
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
