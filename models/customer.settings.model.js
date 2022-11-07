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
    PortalUser: {
      type: Sequelize.BOOLEAN,
    },
    SMSEnabled: {
      type: Sequelize.BOOLEAN,
    },
    BillingEmails: {
      type: Sequelize.BOOLEAN,
    },
    MarketingEmails: {
      type: Sequelize.BOOLEAN,
    },
    ReportEmails: {
      type: Sequelize.BOOLEAN,
    },
    SilentMode: {
      type: Sequelize.BOOLEAN,
    }
  });

  return Customer;
};
