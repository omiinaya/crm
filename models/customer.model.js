module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    customerType: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    businessId: {
      type: Sequelize.STRING,
    },
  });

  return Customer;
};
