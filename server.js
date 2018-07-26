const path = require("path");
const express = require("express");
const compression = require("compression");
const request = require("request");

const {
  port = 3002,
  API_HOST = "https://gci-pickem.herokuapp.com",
  SERVER_USERNAME = "1b2dfab081098556f73039459c53b37f",
  SERVER_PASSWORD = "20a9add1d496051bf5f58b980a5a7799b3a71cf8302a375068d12e779414e28d"
} = process.env;

const authHeader = `Basic ${new Buffer(
  SERVER_USERNAME + ":" + SERVER_PASSWORD
).toString("base64")}`;

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
  console.log({ username, password });

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

      const respBody = JSON.parse(body);

      console.log("body", { respBody });

      if (statusCode !== 200) {
        res.send("Unable to log in");
        return;
      }

      res.send(respBody.access_token);
    }
  );
});

app.get(["/api", "/api/*"], (req, res) => {
  res.status(404).send("Not implemented");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log(`Running on port ${port}`);
