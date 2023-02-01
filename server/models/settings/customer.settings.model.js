module.exports = (sequelize, Sequelize) => {
  const customerSettingsFields = require("../../setup/fields/customer.settings.fields");

  let dynamicFields = {};
  for (let i = customerSettingsFields.length - 1; i >= 0; i--) {
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
