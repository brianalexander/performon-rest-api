require("dotenv").config();

const app = require("./src/config/express");
const objection = require("./src/config/objection");

const port = 9090;

objection.connect();

app.listen(port, () => {
  console.log(`REST API listening on port ${port}...`);
});
