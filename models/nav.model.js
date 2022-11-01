module.exports = (sequelize, Sequelize) => {
  const Nav = sequelize.define("nav_items", {
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
    },
    role_id: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps: false,
  });

  return Nav;
};