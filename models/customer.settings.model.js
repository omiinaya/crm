module.exports = (sequelize, Sequelize) => {
  const CustomerSettings = sequelize.define("customers_settings", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taxRate: {
      type: Sequelize.BOOLEAN,
    },
    taxFree: {
      type: Sequelize.BOOLEAN,
    },
    enablePortal: {
      type: Sequelize.BOOLEAN,
    },
    enableSMS: {
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
    noEmails: {
      type: Sequelize.BOOLEAN,
    },
    customerId: {
      type: Sequelize.STRING
    }
  });

  return CustomerSettings;
};
