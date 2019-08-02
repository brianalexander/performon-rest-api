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

app.use((req, res, next) => {
  const error = new Error("Invalid URI.");
  error.status = 404;
  next(error);
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
