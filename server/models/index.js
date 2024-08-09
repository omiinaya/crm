const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nav = require("./nav.model.js")(sequelize, Sequelize);
db.com = require("./com.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.asset = require("./asset.model")(sequelize, Sequelize);
db.number = require("./number.model")(sequelize, Sequelize);
db.ticket = require("./ticket.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.business = require("./business.model")(sequelize, Sequelize);
db.location = require("./location.model")(sequelize, Sequelize);
db.comFields = require('./fields/com.fields.model')(sequelize, Sequelize);
db.assetFields = require("./fields/asset.fields.model")(sequelize, Sequelize);
db.homeActions = require("./actions/home.actions.model")(sequelize, Sequelize);
db.ticketFields = require("./fields/ticket.fields.model")(sequelize, Sequelize);
db.customerFields = require("./fields/customer.fields.model")(sequelize, Sequelize);
db.locationFields = require("./fields/location.fields.model")(sequelize, Sequelize);
db.customerSettings = require("./settings/customer.settings.model")(sequelize, Sequelize);
db.customerSettingsFields = require("./fields/customer.settings.fields.model")(sequelize, Sequelize);

module.exports = db;
