module.exports = (sequelize, Sequelize) => {
  const assetFields = sequelize.define("asset_field", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
    },
    customerName: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    serial: {
      type: Sequelize.STRING,
    },
    manufacturer: {
      type: Sequelize.STRING,
    },
    tag: {
      type: Sequelize.STRING,
    },
  });

  return assetFields;
};
