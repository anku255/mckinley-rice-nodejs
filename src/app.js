const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const jwt = require("./services/jwt");

const app = express();

// Use bodyParser to put raw req properties at req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(jwt());

// handle routes
app.use("/api", routes);

module.exports = app;
