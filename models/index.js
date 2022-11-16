const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nav = require("./nav.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.asset = require("./asset.model")(sequelize, Sequelize);
db.number = require("./number.model")(sequelize, Sequelize);
db.ticket = require("./ticket.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.business = require("./business.model")(sequelize, Sequelize);
db.location = require("./location.model")(sequelize, Sequelize);
db.home = require("./home.actions.model")(sequelize, Sequelize);
db.assetFields = require("./fields/asset.fields.model")(sequelize, Sequelize);
db.ticketFields = require("./fields/ticket.fields.model")(sequelize, Sequelize);
db.customerSettings = require("./customer.settings.model")(sequelize, Sequelize);
db.customerFields = require("./fields/customer.fields.model")(sequelize, Sequelize);
db.customerSettingsFields = require("./fields/customer.settings.fields.model")(sequelize, Sequelize);

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
