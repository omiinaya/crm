module.exports = (sequelize, Sequelize) => {
  const CustomerFields = sequelize.define("customer_fields", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    side: {
      type: Sequelize.INTEGER,
    },
  });

  return CustomerFields;
};
