module.exports = (sequelize, Sequelize) => {

  const customerFields = require('../setup/fields/customer.fields.data')

  let dynamicFields = {}
  for (let i = customerFields.length - 1; i >= 0; i--) {
    const field = customerFields[i];
    if (!field.data) continue;
    if (field.name === "customerName") continue;
    if (field.name === "phone") continue;
    dynamicFields[field.name] = {
      type: Sequelize[field.data],
      allowNull: field.allowNull || false
    };
  }

  const Customer = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER(5).ZEROFILL,
      autoIncrement: true,
      primaryKey: true,
    },
    ...dynamicFields
  });

  return Customer;
};
