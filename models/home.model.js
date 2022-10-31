module.exports = (sequelize, Sequelize) => {
  const Action = sequelize.define("home", {
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

  return Action;
};