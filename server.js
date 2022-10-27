require('dotenv').config()
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const db = require("./models/index");
const app = express();

app.use(cors({ origin: "http://localhost:8091" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

db.sequelize.sync(/*{ force: true }*/).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/navItem.routes")(app);

// set port, listen for requests
const PORT = process.env.SERVER || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});