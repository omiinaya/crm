require("dotenv").config();
const setup = require("./setup/db.setup");
const express = require("express");
const serveStatic = require("serve-static");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = parseInt(process.env.PORT) || 8080;
const path = require('path');

const origins = ["http://localhost:8091", "http://localhost", "http://localhost:8092", "https://mmit.vercel.app"];

app.use(cors({ origin: origins }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use('/', serveStatic(path.join(__dirname, '../dist')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

require("./routes/nav.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/com.routes")(app);
require("./routes/home.routes")(app);
require("./routes/asset.routes")(app);
require("./routes/number.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/business.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/location.routes")(app);

const server = app.listen(port, () => {
  console.log(`Server: ${port}.`);
});

(async () => {

  //await setup();

  const options = {
    cors: { origin: origins },
  };

  const io = require("socket.io")(server, options);
  const socket = io.listen(port + 2, () => {
    console.log(`Socket.io: ${port + 2}.`);
  });

  socket.on("connection", (client) => {
    console.log("connection established.");

    client.on("disconnect", () => {
      console.log("connection has ended");
    });

    client.on("message", (data) => {
      console.log("Received message:", data);
    });

    client.on("comCreatedRequest", (id) => {
      socket.emit("comCreatedResponse", id);
    });

    client.on("ticketUpdateRequest", (id) => {
      socket.emit("ticketUpdateResponse", id);
    });
  });
})();
