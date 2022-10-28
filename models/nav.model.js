module.exports = (sequelize, Sequelize) => {
  const Nav = sequelize.define("nav", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    icon: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
  });

  return Nav;
};