module.exports = (sequelize, Sequelize) => {
  const NavItem = sequelize.define("navItem", {
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

  return NavItem;
};