const path = require("path");
const express = require("express");
const compression = require("compression");
const request = require("request");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const {
  PORT = 3002,
  API_HOST,
  API_HOST_USERNAME,
  API_HOST_PASSWORD
} = process.env;

const authHeader = `Basic ${new Buffer(
  API_HOST_USERNAME + ":" + API_HOST_PASSWORD
).toString("base64")}`;

if (!API_HOST_USERNAME || !API_HOST_PASSWORD) {
  console.warn("missing authentication headers");
}

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());
app.use(compression());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", (req, res) => {
  const { body: { username, password } } = req;

  request(
    {
      url: `${API_HOST}/oauth/token`,
      method: "POST",
      headers: {
        Authorization: authHeader
      },
      form: {
        grant_type: "password",
        username,
        password
      }
    },
    function(error, response, body) {
      const statusCode = (response && response.statusCode) || 502;
      res.status(statusCode);

      let respBody;
      try {
        respBody = JSON.parse(body);
      } catch (e) {
        console.log("Bad response", body);
        res.status(502).send("Bad upstream server");
        return;
      }

      if (statusCode !== 200) {
        res.send("Unable to log in");
        return;
      }

      res.send(respBody.access_token);
    }
  );
});

app.get("/api/v1/games/season/:year/week/:week", (req, res) => {
  const { params: { year, week } } = req;
  const clientAuth = req.header("Authorization");

  request(
    {
      url: `${API_HOST}/api/v1/games/season/${year}/week/${week}`,
      method: "GET",
      headers: {
        Authorization: clientAuth
      }
    },
    function(error, response, body) {
      const statusCode = (response && response.statusCode) || 502;
      res.status(statusCode);

      let respBody;
      try {
        respBody = JSON.parse(body);
      } catch (e) {
        console.log("Bad response", body);
        res.status(502).send("Bad upstream server");
        return;
      }

      if (statusCode !== 200) {
        res.send("Could not retreive week");
        return;
      }

      res.send(respBody);
    }
  );
});

app.get(["/api", "/api/*"], (req, res) => {
  res.status(404).send("Not implemented");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
