module.exports = (sequelize, Sequelize) => {
  const customerSettingsFields = require("../../setup/fields/customers.settings.fields");

  let dynamicFields = {};
  for (let i = 0; i < customerSettingsFields.length; i++) {
    const field = customerSettingsFields[i];
    if (!field.data) continue;
    dynamicFields[field.name] = { 
      type: Sequelize[field.data.type], 
      default: field.data.default
    };
  }

  const CustomerSettings = sequelize.define("customers_settings", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ...dynamicFields
  });

  return CustomerSettings;
};
