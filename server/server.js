require("dotenv").config({ path: '../.env' });
const setup = require("./setup/db.setup");
const express = require("express");
const serveStatic = require("serve-static");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = parseInt(process.env.APP_PORT) || 8080;
const path = require('path');
const http = require('http')

const origins = { origin: ["http://localhost:9000", "http://localhost:9001", "http://localhost:8080", "http://192.168.1.77:9000", "https://192.168.1.77:9000"] };

app.use(cors(origins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser())

app.use(serveStatic(path.join(__dirname, 'dist')));
app.use('/', serveStatic(path.join(__dirname, '../dist')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

require("./routes/nav.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/home.routes")(app);
require("./routes/com.routes")(app);
require("./routes/asset.routes")(app);
require("./routes/number.routes")(app);
require("./routes/ticket.routes")(app);
require("./routes/business.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/location.routes")(app);

(async () => {

  await setup();

  const options = {
    cors: origins,
  };

  const server = http.createServer(app)

  const io = require("socket.io")(server, options);

  io.on('connection', client => {
    console.log("connection established.");
    io.emit("resetHistory");

    client.on("disconnect", () => {
      console.log("connection has ended");
    });

    client.on("message", (data) => {
      console.log("Received message:", data);
    });

    client.on("comCreatedRequest", (id) => {
      console.log("comCreatedRequest")
      io.emit("comCreatedResponse", id);
    });

    client.on("ticketUpdateRequest", (id) => {
      io.emit("ticketUpdateResponse", id);
    });
  });

  server.listen(port, () => {
    console.log(`Server: ${port}.`);
  });
})();
