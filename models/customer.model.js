module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
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
    businessName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address1: {
      type: Sequelize.STRING,
    },
    address2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zip: {
      type: Sequelize.STRING,
    },
  });

  return Customer;
};
