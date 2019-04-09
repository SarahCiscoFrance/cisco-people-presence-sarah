module.exports = io => {
  const express = require("express");
  const cors = require("cors");
  const morgan = require("morgan");
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");

  const codecRoutes = require("./api/routes/codec")(io);
  const historyRoutes = require("./api/routes/history");

  const app = express();

  mongoose.connect(
    "mongodb://" + process.env.MONGO_DB_URL + "/cisco-people-presence",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  mongoose.Promise = global.Promise;

  app.use(morgan("dev"));
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.use(cors());

  app.use("/codec", codecRoutes);
  app.use("/history", historyRoutes);

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

  return app;
};
