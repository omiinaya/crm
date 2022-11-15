const db = require("../../models");
const AssetFields = db.assetFields
const Op = db.Sequelize.Op;
const axios = require("axios")

exports.create = async (req, res) => {
  /*
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
*/
  const assetFields = await axios.get("http://localhost:8090/api/customer/fields");
  const assetResponse = await assetFields.data;


  const fields = [...assetResponse]

  let asset = {};

  for (let i = 0; i < fields.length; i++) {
    asset[fields[i].name] = req.body[fields[i].name];
  }

  try {
    const request = await AssetFields.create(assetFields)
    res.send(await request)
  } catch (err) {
    console.log(err)
  }
  /*
    const assetField = {
      title: req.body.title,
      icon: req.body.description,
      url: req.body.published,
    };
  
    AssetFields.create(assetField)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Nav.",
        });
      });
      */
};

exports.findAll = (req, res) => {
  AssetFields.findAll()
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

  AssetFields.findAll({
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
  AssetFields.findAll({
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

  AssetFields.update(req.body, {
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

  AssetFields.destroy({
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
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
