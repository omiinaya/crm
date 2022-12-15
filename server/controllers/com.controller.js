const db = require("../models");
const axios = require("axios");
const Com = db.com;
const io = require('socket.io-client');
const nodemailer = require('nodemailer');

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
    "http://localhost:8090/api/com/fields"
  );
  const comResponse = await comFields.data;

  comResponse[comResponse.length] = {
    id: 7,
    name: 'customerPhone'
  }

  comResponse[comResponse.length] = {
    id: 8,
    name: 'customerEmail'
  }

  let com = {};

  for (let i = 0; i < comResponse.length; i++) {
    com[comResponse[i].name] = req.body[comResponse[i].name];
  }

  try {
    const request = await Com.create(com);
    const ticketId = await request.comTicketId;
    const visibility = com.comVis;
    const message = com.comMsg;
    const number = `+1${com.customerPhone.replaceAll('-', '')}`
    const twilio = `+1${7866613221}`
    const socket = io('http://localhost:8092');
    const email = com.customerEmail;
    const subject = `Ticket #${ticketId.toString().padStart(5, '0')}`

    socket.emit("comCreatedRequest", ticketId);

    if (visibility === 'Email + SMS') {
      sendText(message, twilio, number)
      sendMail(email, subject, message)
    } else if (visibility === 'SMS') {
      sendText(message, twilio, number)
    } else if (visibility === 'Email') {
      sendMail(email, subject, message)
    }

    res.send(await request);
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = (req, res) => {
  Com.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findByTicketId = (req, res) => {
  const id = req.params.id;

  Com.findAll({
    where: { comTicketId: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findByAuthorId = (req, res) => {
  const id = req.params.id;

  Com.findAll({
    where: { comAuthorId: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Com.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id + err,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id + err,
      });
    });
};
