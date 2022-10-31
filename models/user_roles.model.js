module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    roleId: {
      type: Sequelize.INTEGER
    }
  },
    {
      timestamps: false,
    });

  return Role;
};