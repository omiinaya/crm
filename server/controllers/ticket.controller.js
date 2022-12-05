const db = require("../models");
const Ticket = db.ticket;
const Asset = db.asset;
const Op = db.Sequelize.Op;
const axios = require('axios')

exports.create = async (req, res) => {
  const ticketFields = await axios.get("http://localhost:8090/api/ticket/fields");
  const assetFields = await axios.get("http://localhost:8090/api/asset/fields");
  const ticketResponse = await ticketFields.data;
  const assetResponse = await assetFields.data;

  let ticket = {};
  let asset = {};

  for (let i = 0; i < ticketResponse.length; i++) {
    ticket[ticketResponse[i].name] = req.body[ticketResponse[i].name];
  }

  for (let i = 0; i < assetResponse.length; i++) {
    if (assetResponse[i].name === 'assetCustomerName') continue; //ignore customerName field.
    asset[assetResponse[i].name] = req.body[assetResponse[i].name];
  }
  //default status is new
  ticket['ticketStatus'] = 'New';

  try {
    const request = await Ticket.create(ticket)
    //both asset and ticket are assigned the same customer id.
    asset['assetCustomerId'] = ticket['ticketCustomerId']
    //add ticket number to asset number, after ticket has been created.
    asset['assetTicketNumber'] = await request.id

    Asset.create(asset);
    
    res.send(await request)
  } catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {
  Ticket.findAll()
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

exports.findByRoleId = (req, res) => {
  const id = req.params.id;

  Ticket.findAll({
    where: { roleId: id },
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

exports.findByRole = (req, res) => {
  const id = req.params.id;
  Ticket.findAll({
    where: {
      roleId: {
        [Op.lte]: id,
      },
    },
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
        message: "Error updating Tutorial with id=" + id,
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
