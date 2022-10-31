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
  icon: '',
  url: '#!'
},
{
  title: 'New Ticket',
  icon: '',
  url: '#!'
},
{
  title: 'New Check In',
  icon: '',
  url: '#!'
},
{
  title: 'New Invoice',
  icon: '',
  url: '#!'
},
{
  title: 'New Estimate',
  icon: '',
  url: '#!'
}]

const navs = [{
  title: "Customers",
  icon: "bi bi-person",
  url: "#!",
}, {
  title: "Assets",
  icon: "bi bi-laptop",
  url: "#!",
}, {
  title: "Invoices",
  icon: "bi bi-cart",
  url: "#!",
}, {
  title: "Estimates",
  icon: "bi bi-file-earmark-text",
  url: "#!",
}, {
  title: "Tickets",
  icon: "bi bi-tag",
  url: "#!",
}, {
  title: "Parts",
  icon: "bi bi-motherboard",
  url: "#!",
}, {
  title: "Inventory",
  icon: "bi bi-upc-scan",
  url: "#!",
},
{
  title: "POS",
  icon: "bi bi-cash",
  url: "#!",
}, {
  title: "Admin",
  icon: "bi bi-gear",
  url: "#!",
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
