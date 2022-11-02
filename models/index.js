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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.nav = require("./nav.model.js")(sequelize, Sequelize);
db.home = require("./home.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.customerFields = require("./customer.fields.model")(sequelize, Sequelize);

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
