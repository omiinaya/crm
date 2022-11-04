module.exports = (sequelize, Sequelize) => {
  const Action = sequelize.define("home_actions", {
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
    roleId: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps: false,
  });

  return Action;
};