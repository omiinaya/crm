require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbSetup = require("./setup/db.setup");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.SERVER || 8080;

app.use(cors({ origin: "http://localhost:8091" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

require("./routes/nav.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/home.routes")(app);
require("./routes/asset.routes")(app);
require("./routes/number.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/business.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/location.routes")(app);

(async () => {
  await dbSetup();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
})();
