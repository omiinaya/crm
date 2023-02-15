const db = require("../models");
const Ticket = db.ticket;
const Asset = db.asset;
const Com = db.com;
const io = require('socket.io-client');

const PORT = parseInt(process.env.PORT);
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:${PORT}`;

exports.create = async (req, res) => {
  try {
    const ticket = req.body.ticket;
    const asset = req.body.asset;
    const request = await Ticket.create(ticket);

    const com = {
      comAuthorName: request.ticketTech,
      comTicketId: request.id,
      comMsg: request.ticketDesc,
      comVis: 'Private Note',
      comType: 'Issue'
    }

    if (req.body.asset) {
      //both asset and ticket are assigned the same customer id.
      asset["assetCustomerId"] = ticket["ticketCustomerId"];
      //add ticket number to asset number, after ticket has been created.
      asset["assetTicketId"] = await request.id;

      Asset.create(asset);
    }

    Com.create(com);
    
    res.send(await request);
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Ticket.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findByTicketId = (req, res) => {
  const id = req.params.id;

  Ticket.findAll({
    where: { id: id },
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

exports.findByCustomerId = (req, res) => {
  const id = req.params.id;

  Ticket.findAll({
    where: { ticketCustomerId: id },
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

exports.findByAssetId = (req, res) => {
  const id = req.params.id;

  Ticket.findAll({
    where: { ticketAssetId: id },
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

exports.findByTechnician = (req, res) => {
  //todo: use ids instead of names
  const name = req.params.name;

  Ticket.findAll({
    where: { ticketTech: name },
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

  Ticket.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        const socket = io(URL);
        socket.emit("ticketUpdateRequest", id);
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
