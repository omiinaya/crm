require("dotenv").config();
const setup = require("./setup/db.setup");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = parseInt(process.env.SERVER) || 8080;

app.use(cors({ origin: ["http://localhost:8091", "https://mmit.vercel.app"] }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

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

(async () => {
  await setup();

  const options = {
    cors: { origin: ["http://localhost:8091", "https://mmit.vercel.app"] },
  };

  const server = app.listen(port, () => {
    console.log(`Server: ${port}.`);
  });
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
