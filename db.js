
const MYSQL = require('mysql2')
const CONFIG = { 
    host: process.env.HOST, 
    port: process.env.DB_PORT, 
    user: process.env.USER, 
    password: process.env.PASSWORD }

const connection = MYSQL.createConnection(CONFIG);
connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,

    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./models/user.models.js")(sequelize, Sequelize);

module.exports = db;