module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taxRate: {
      type: Sequelize.STRING,
    },
    taxFree: {
      type: Sequelize.STRING,
    },
    portalUser: {
      type: Sequelize.BOOLEAN,
    },
    smsEnabled: {
      type: Sequelize.BOOLEAN,
    },
    billingEmails: {
      type: Sequelize.BOOLEAN,
    },
    marketingEmails: {
      type: Sequelize.BOOLEAN,
    },
    reportEmails: {
      type: Sequelize.BOOLEAN,
    },
    silentMode: {
      type: Sequelize.BOOLEAN,
    }
  });

  return Customer;
};
