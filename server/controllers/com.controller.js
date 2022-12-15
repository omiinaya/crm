const db = require("../models");
const axios = require("axios");
const Com = db.com;
const io = require('socket.io-client');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;

const client = require('twilio')(accountSid, authToken);

exports.create = async (req, res) => {
  const comFields = await axios.get(
    "http://localhost:8090/api/com/fields"
  );
  const comResponse = await comFields.data;

  comResponse[comResponse.length] = {
    id: 7,
    name: 'customerPhone'
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

    socket.emit("comCreatedRequest", ticketId);

    if (visibility === 'Email + SMS' || visibility === 'SMS') {
      console.log(number)
      console.log(twilio)

      client.messages
        .create({
          body: message,
          from: twilio,
          to: number
        })
        .then(message => console.log(message.sid));
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
