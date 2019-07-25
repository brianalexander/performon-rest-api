// Express
const express = require("express");
// Express Middlewares Imports
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
// Routes
const routes = require("../api/routes/v1");

const app = express();

//
// Add Middlewares
//
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// add routes
app.use("/v1", routes);

module.exports = app;
