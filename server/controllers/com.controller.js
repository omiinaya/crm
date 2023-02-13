const db = require("../models");
const axios = require("axios");
const Com = db.com;
const io = require('socket.io-client');
const nodemailer = require('nodemailer');

const PORT = parseInt(process.env.PORT);
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:${PORT}`;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;

const transport = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USR,
    pass: process.env.OUTLOOK_PWD
  },
  tls: {
    ciphers: process.env.MAIL_CIPHERS,
    rejectUnauthorized: false,
  }
});

const client = require('twilio')(accountSid, authToken);

function sendText(message, sender, receiver) {
  client.messages
    .create({
      body: message,
      from: sender,
      to: receiver
    })
    .then(message => console.log(message.sid));
}

function sendMail(email, subject, text) {
  transport.sendMail({
    from: process.env.OUTLOOK_USR,
    to: email,
    subject: subject,
    text: text
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

exports.create = async (req, res) => {
  const comFields = await axios.get(
    `${URL}/api/com/fields`
  );

  let comResponse = await comFields.data;
  comResponse = [...comResponse, { id: 7, name: "comPhoneNumber" }, { id: 8, name: "customerEmail" }];

  let com = {};

  for (let i = comResponse.length - 1; i >= 0; i--) {
    com[comResponse[i].name] = req.body[comResponse[i].name];
  }

  try {
    const request = await Com.create(com);
    const ticketId = await request.comTicketId;
    const visibility = com.comVis;
    const message = com.comMsg;
    const number = `+1${com.comPhoneNumber.replaceAll('-', '')}`
    const twilio = `+1${7866613221}`
    const socket = io(URL);
    const email = com.customerEmail;
    const subject = `Ticket #${ticketId}`

    socket.emit("comCreatedRequest", ticketId);

    // Use switch statement instead of if/else
    switch (visibility) {
      case "Email + SMS":
        sendText(message, twilio, number);
        sendMail(email, subject, message);
        break;
      case "SMS":
        sendText(message, twilio, number);
        break;
      case "Email":
        sendMail(email, subject, message);
        break;
    }

    res.send(await request);
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Com.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findByTicketId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Com.findAll({
      where: { comTicketId: id },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findByAuthorId = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Com.findAll({
      where: { comAuthorId: id },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Com.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Tutorial was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id + err,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Ticket.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Tutorial was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id + err,
    });
  }
};
