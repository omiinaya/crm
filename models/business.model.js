module.exports = (sequelize, Sequelize) => {
  const Business = sequelize.define("businesses", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Business;
};
