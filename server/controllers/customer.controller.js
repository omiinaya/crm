const db = require("../models");
const axios = require("axios");
const Customer = db.customer;
const Number = db.number;
const Location = db.location;
const CustomerSettings = db.customerSettings;
const Op = db.Sequelize.Op;
const PORT = process.env.PORT

exports.create = async (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const customerFields = await axios.get(
    `http://localhost:${PORT}/api/customers/fields`
  );
  const locationFields = await axios.get(
    `http://localhost:${PORT}/api/locations/fields`
  );
  const customerSettingsFields = await axios.get(
    `http://localhost:${PORT}/api/customers/settings/fields`
  );

  const customerResponse = await customerFields.data;
  const locationResponse = await locationFields.data;
  const customerSettingsResponse = await customerSettingsFields.data;

  const fields = [
    ...customerResponse,
    ...locationResponse,
    ...customerSettingsResponse,
  ];

  let customer = {};

  for (let i = 0; i < fields.length; i++) {
    //console.log(fields[i]);
    customer[fields[i].name] = req.body[fields[i].name];
  }

  try {
    const request = await Customer.create(customer);
    const customerId = await request.id;

    const phoneData = {
      type: req.body.phoneType,
      number: customer.phone,
      extension: req.body.extension,
      customerId: customerId,
    };

    const locationData = {
      address1: customer.address1,
      address2: customer.address2,
      country: customer.country,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      customerId: customerId,
    };

    const settingData = {
      taxRate: customer.taxRate,
      taxFree: customer.taxFree,
      enablePortal: customer.enablePortal,
      enableSMS: customer.enableSMS,
      billingEmails: customer.billingEmails,
      marketingEmails: customer.marketingEmails,
      reportEmails: customer.reportEmails,
      noEmails: customer.noEmails,
    };

    CustomerSettings.create(settingData);

    const newPhone = await Number.create(phoneData);
    const newAddress = await Location.create(locationData);

    const newPhoneId = await newPhone.id;
    const newAddressId = await newAddress.id;

    const toUpdate1 = { primaryPhone: newPhoneId };
    const options1 = { where: { id: customerId } };

    const toUpdate2 = { primaryAddress: newAddressId };
    const options2 = { where: { id: customerId } };

    Customer.update(toUpdate1, options1);
    Customer.update(toUpdate2, options2);

    res.send(await request);
  } catch (err) {
    console.log(err);
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

exports.findById = (req, res) => {
  const id = req.params.id;

  Customer.findAll({
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
        message: "Error updating Tutorial with id=" + id + err,
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
        message: "Could not delete Tutorial with id=" + id + err,
      });
    });
};
