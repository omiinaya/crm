const mysql = require("mysql2");
const db = require("./models/index");
const util = require("util");

const Role = db.role;
const Nav = db.nav;
const User = db.user;
const Home = db.home;

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

const roles = ["user", "moderator", "admin"]

const actions = [{
  title: 'New Customer',
  icon: 'bi bi-person',
  url: '#!'
},
{
  title: 'New Ticket',
  icon: 'bi bi-tag',
  url: '#!'
},
{
  title: 'New Check In',
  icon: 'bi bi-check-square',
  url: '#!'
},
{
  title: 'New Invoice',
  icon: 'bi bi-cart',
  url: '#!'
},
{
  title: 'New Estimate',
  icon: 'bi bi-file-earmark-text',
  url: '#!'
}]

const navs = [{
  id: 0,
  title: "Home",
  icon: "bi bi-house",
  url: "homeView",
}, {
  id: 1,
  title: "Customers",
  icon: "bi bi-person",
  url: "customersView",
}, {
  id: 2,
  title: "Assets",
  icon: "bi bi-laptop",
  url: "assetsView",
}, {
  id: 3,
  title: "Invoices",
  icon: "bi bi-cart",
  url: "invoicesView",
}, {
  id: 4,
  title: "Estimates",
  icon: "bi bi-file-earmark-text",
  url: "estimatesView",
}, {
  id: 5,
  title: "Tickets",
  icon: "bi bi-tag",
  url: "ticketsView",
}, {
  id: 6,
  title: "Parts",
  icon: "bi bi-motherboard",
  url: "partsView",
}, {
  id: 7,
  title: "Inventory",
  icon: "bi bi-upc-scan",
  url: "inventoryView",
},
{
  id: 8,
  title: "POS",
  icon: "bi bi-cash",
  url: "posView",
}, {
  id: 9,
  title: "Admin",
  icon: "bi bi-gear",
  url: "adminView",
  role_id: 3
}]

function dummyData() {
  roles.forEach((role, index) => {
    Role.create({
      id: index + 1,
      name: role
    })
  })

  navs.forEach((role) => {
    Nav.create({
      title: role.title,
      icon: role.icon,
      url: role.url,
      role_id: role.role_id
    })
  })

  actions.forEach((action) => {
    Home.create({
      title: action.title,
      icon: action.icon,
      url: action.url,
      role_id: action.role_id
    })
  })

  User.create({
    firstName: "test",
    lastName: "ing",
    username: "test",
    email: "test@gmail.com",
    password: "$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy",
  }).then(user => {
    user.setRoles([3])
  })
}

module.exports = dbSetup;
