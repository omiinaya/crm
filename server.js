require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setup = require("./setup");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const db = require("./models/index");
const config = require('./db.config')
const util = require('util');

const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);
const port = process.env.SERVER || 8080;

//use
app.use(cors({ origin: "http://localhost:8091" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

require("./routes/navItem.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

(async () => {
  await query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);
  db.sequelize.sync({ force: true }).then(() => setup(db));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
})()