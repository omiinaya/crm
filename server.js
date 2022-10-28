require('dotenv').config()
const express = require("express");
const cors = require("cors");
const setup = require('./setup')

const bodyParser = require("body-parser");
const db = require("./models/index");
const app = express();

const Role = db.role;
const NavItem = db.navItem

app.use(cors({ origin: "http://localhost:8091" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  setup(Role, NavItem)
});

require("./routes/navItem.routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.SERVER || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});