const db = require("../../models");
const ComFields = db.comFields
const Op = db.Sequelize.Op;
const axios = require("axios")
const PORT = process.env.PORT

exports.create = async (req, res) => {
  const comFields = await axios.get(`http://localhost:${PORT}/api/com/fields`);
  const comResponse = await comFields.data;


  const fields = [...comResponse]

  let com = {};

  for (let i = 0; i < fields.length; i++) {
    asset[fields[i].name] = req.body[fields[i].name];
  }

  try {
    const request = await ComFields.create(comFields)
    res.send(await request)
  } catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {
  ComFields.findAll()
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

  ComFields.findAll({
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
  ComFields.findAll({
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

  ComFields.update(req.body, {
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

  ComFields.destroy({
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
