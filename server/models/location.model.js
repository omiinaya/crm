module.exports = (sequelize, Sequelize) => {

  const locationFields = require('../setup/fields/location.fields.data')

  let dynamicFields = {}
  for (let i = locationFields.length - 1; i >= 0; i--) {
    const field = locationFields[i];
    if (!field.data) continue;
    dynamicFields[field.name] = { type: Sequelize[field.data] };
  }

  const Location = sequelize.define("location", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ...dynamicFields
  });

  return Location;
};
