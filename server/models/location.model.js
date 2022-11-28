module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address1: {
      type: Sequelize.STRING,
    },
    address2: {
      type: Sequelize.STRING,
    },
    country: {
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
    customerId: {
      type: Sequelize.STRING
    }
  });

  return Location;
};
