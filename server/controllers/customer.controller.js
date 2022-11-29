const db = require("../models");
const axios = require("axios");
const Customer = db.customer;
const Number = db.number;
const Location = db.location;
const CustomerSettings = db.customerSettings;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const customerFields = await axios.get("http://localhost:8090/api/customer/fields");
  const locationFields = await axios.get("http://localhost:8090/api/customer/locations/fields")
  const customerSettingsFields = await axios.get("http://localhost:8090/api/customer/settings/fields");
  
  const customerResponse = await customerFields.data;
  const locationResponse = await locationFields.data;
  const customerSettingsResponse = await customerSettingsFields.data;

  const fields = [...customerResponse, ...locationResponse, ...customerSettingsResponse]

  let customer = {};

  for (let i = 0; i < fields.length; i++) {
    customer[fields[i].name] = req.body[fields[i].name];
  }

  try {
    const request = await Customer.create(customer)

    const phoneData = {
      type: 'Mobile',
      number: customer.phone,
      extension: customer.extension,
      customerId: await request.id
    }

    const locationData = {
      address1: customer.address1,
      address2: customer.address2,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      customerId: await request.id
    }

    const settingData = {
      taxRate: customer.taxRate,
      taxFree: customer.taxFree,
      enablePortal: customer.enablePortal,
      enableSMS: customer.enableSMS,
      billingEmails: customer.billingEmails,
      marketingEmails: customer.marketingEmails,
      reportEmails: customer.reportEmails,
      noEmails: customer.noEmails
    }
    console.log(customer)
    //console.log(settingData)

    Number.create(phoneData);
    Location.create(locationData);
    CustomerSettings.create(settingData)

    res.send(await request)
  } catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {
  Customer.findAll()
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

  Customer.findAll({
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
  Customer.findAll({
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

  Customer.update(req.body, {
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

  Customer.destroy({
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
