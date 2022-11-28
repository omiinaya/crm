module.exports = (sequelize, Sequelize) => {

  const customerFields = require('../setup/fields/customer.fields.data')

  let dynamicFields = {}
  for (let i = 0; i < customerFields.length; i++) {
      field = customerFields[i]
      if (!field.data) continue;
      dynamicFields[field.name] = { type: Sequelize[field.data] }
  }

  console.log(dynamicFields)

  const Customer = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ...dynamicFields
  });

  return Customer;
};
