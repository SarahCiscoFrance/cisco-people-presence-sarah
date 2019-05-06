const express = require("express");
const path = require("path");
const app = express();
const port = 15131;

app.use(express.static("dist"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () =>
  console.log(`Cisco people presence client listening on port ${port}!`)
);
