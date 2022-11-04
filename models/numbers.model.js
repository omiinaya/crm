module.exports = (sequelize, Sequelize) => {
  const Numbers = sequelize.define("numbers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    extension: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    },
  });

  return Numbers;
};
