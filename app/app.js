require("dotenv").config("../.env");

const express = require("express");
const app = express();

app.use(require("./middleware"));


module.exports = app;