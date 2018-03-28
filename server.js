const path = require("path");
const express = require("express");

const isDeveloping = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = express();
const compression = require("compression");

app.use(compression());

app.use(express.static(__dirname + "/build"));

app.get(["/api", "/api/*"], (req, res) => {
  res.status(404).send("Not implemented");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  }
  console.info(`Listening on port ${port}`);
});
