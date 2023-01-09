module.exports = (sequelize, Sequelize) => {
  const assetFields = sequelize.define("asset_field", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    label: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    placeholder: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
    options: {
      type: Sequelize.STRING
    },
    required: {
      type: Sequelize.STRING
    },
    show: {
      type: Sequelize.BOOLEAN,
    },
  });

  return assetFields;
};
