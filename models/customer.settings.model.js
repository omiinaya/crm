module.exports = (sequelize, Sequelize) => {
  const CustomerSettings = sequelize.define("customers_settings", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taxRate: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    taxFree: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    enablePortal: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    enableSMS: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    billingEmails: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    marketingEmails: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    reportEmails: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    noEmails: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    customerId: {
      type: Sequelize.STRING
    }
  });

  return CustomerSettings;
};
