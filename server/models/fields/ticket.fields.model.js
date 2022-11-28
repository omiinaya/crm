module.exports = (sequelize, Sequelize) => {
  const ticketFields = sequelize.define("ticket_field", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    label: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    placeholder: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
    side: {
      type: Sequelize.INTEGER,
    },
    options: {
      type: Sequelize.STRING
    },
    show: {
      type: Sequelize.BOOLEAN,
    },
  });

  return ticketFields;
};
