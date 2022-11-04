module.exports = (sequelize, Sequelize) => {
  const Number = sequelize.define("number", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    extension: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    },
  });

  return Number;
};
