require("dotenv").config();

const http = require("http");

const io = require("socket.io")(http);

const app = require("./app")(io);

const ciscoHttpFeedback = require("./webhooks/cisco-http-feedback");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Cisco people presence listens on port", port);

  ciscoHttpFeedback.registerHttpFeedback();

  setInterval(() => {
    ciscoHttpFeedback.registerHttpFeedback();
  }, process.env.INTERVAL_HTTP_FEEDBACK);
});

io.listen(server);
