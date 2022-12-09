module.exports = (sequelize, Sequelize) => {
  const CustomerFields = sequelize.define("customer_fields", {
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
    show: {
      type: Sequelize.BOOLEAN,
    },
    options: {
      type: Sequelize.STRING
    },
    show: {
      type: Sequelize.BOOLEAN,
    },
  });

  return CustomerFields;
};
