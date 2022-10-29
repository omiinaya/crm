const mysql = require("mysql2");
const db = require("./models/index");
const util = require("util");

const Role = db.role;
const Nav = db.nav;
const User = db.user;

const config = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
};

const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

async function dbSetup() {
  await query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);
  //comment force:true to stop resetting the database on server restart
  db.sequelize.sync({ force: true }).then(() => dummyData());
}

function dummyData() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Nav.create({
    title: "Customers",
    icon: "bi bi-person",
    url: "#!",
  });

  Nav.create({
    title: "Assets",
    icon: "bi bi-laptop",
    url: "#!",
  });

  Nav.create({
    title: "Invoices",
    icon: "bi bi-cart",
    url: "#!",
  });

  Nav.create({
    title: "Estimates",
    icon: "bi bi-file-earmark-text",
    url: "#!",
  });

  Nav.create({
    title: "Tickets",
    icon: "bi bi-tag",
    url: "#!",
  });

  Nav.create({
    title: "Parts",
    icon: "bi bi-motherboard",
    url: "#!",
  });

  Nav.create({
    title: "Inventory",
    icon: "bi bi-upc-scan",
    url: "#!",
  });

  Nav.create({
    title: "POS",
    icon: "bi bi-cash",
    url: "#!",
  });

  Nav.create({
    title: "Admin",
    icon: "bi bi-gear",
    url: "#!",
  });

  User.create({
    firstName: "test",
    lastName: "ing",
    username: "test",
    email: "test@gmail.com",
    password: "$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy",
  });
}

module.exports = dbSetup;
