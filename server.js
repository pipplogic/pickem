const path = require("path");
const express = require("express");
const compression = require("compression");
const request = require("request");
const API_HOST = process.env.API_HOST || "https://gci-pickem.herokuapp.com";

const port = process.env.PORT || 3002;
const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/api/years/:year/weeks/:week/games", (req, res) => {
  const { params: { year, week } } = req;

  request.get(`${API_HOST}/api/v1/games/season/${year}/week/${week}`, function(
    err,
    msg,
    body
  ) {
    res.json(JSON.parse(body));
  });
});

app.get(["/api", "/api/*"], (req, res) => {
  res.status(404).send("Not implemented");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log(`Running on port ${port}`);
