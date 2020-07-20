const express = require("express");
const bearerToken = require("express-bearer-token");
const app = express();
const secret = "weirdsecret";
var jwt = require("jsonwebtoken");

app.use(bearerToken());

app.use("/log", function (req, res) {
  let token = Buffer.from(req.token, "base64").toString("ascii");
  var decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (ex) {
    decoded = ex;
  }
  res.send(decoded);
});

app.use("/", function (req, res) {
  let username = "Moheb";
  let token = jwt.sign({ username }, secret, {
    algorithm: "HS256",
    expiresIn: 100,
  });
  token = Buffer.from(token).toString("base64");
  res.send(token);
});
console.log("Started");
app.listen(8000);
