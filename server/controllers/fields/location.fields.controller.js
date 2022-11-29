const db = require("../../models");
const LocationFields = db.locationFields;

exports.create = async (req, res) => {

  const locationField = {
    title: req.body.title,
    icon: req.body.description,
    url: req.body.published,
  };

  try {
    const request = await LocationFields.create(locationField)
    res.send(await request)
    console.log(request)
  } catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {
  LocationFields.findAll()
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

  LocationFields.update(req.body, {
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

  LocationFields.destroy({
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
