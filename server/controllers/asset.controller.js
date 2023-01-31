const db = require("../models");
const Asset = db.asset
const axios = require('axios')
const PORT = process.env.PORT

exports.create = async (req, res) => {
  const assetFields = await axios.get(`http://localhost:${PORT}/api/asset/fields`);
  const assetResponse = await assetFields.data;

  const fields = [...assetResponse]

  let asset = {};

  for (let i = 0; i < fields.length; i++) {
    asset[fields[i].name] = req.body[fields[i].name];
  }

  try {
    const request = await Asset.create(asset)
    res.send(await request)
  } catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {
  Asset.findAll()
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

  Asset.findAll({
    where: { assetCustomerId: id },
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

exports.findByTicketId = (req, res) => {
  const id = req.params.id;

  Asset.findAll({
    where: { assetTicketId: id },
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

exports.findById = (req, res) => {
  const id = req.params.id;

  Asset.findAll({
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

exports.update = (req, res) => {
  const id = req.params.id;

  Asset.update(req.body, {
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

  Asset.destroy({
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
