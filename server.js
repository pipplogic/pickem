const path = require("path");
const express = require("express");
const compression = require("compression");

const port = process.env.PORT || 3002;
const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, "/build")));

app.get(["/api", "/api/*"], (req, res) => {
  res.status(404).send("Not implemented");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
