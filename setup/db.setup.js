const mysql = require("mysql2");
const db = require("../models/index");
const util = require("util");

const navs = require('./nav.data');
const users = require('./users.data');
const roles = require('./roles.data');
const numbers = require('./numbers.data');
const customers = require('./customers.data');
const businesses = require('./businesses.data');
const homeActions = require('./home.actions.data');
const customerFields = require('./customer.fields.data');
const customerSettingsFields = require('./customers.settings.fields');

const Role = db.role;
const Nav = db.nav;
const User = db.user;
const Home = db.home;
const Customer = db.customer;
const Business = db.business;
const Number = db.number;
const CustomerFields = db.customerFields;
const CustomerSettingsFields = db.customerSettingsFields;

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
  customers.forEach((customer) => {
    Customer.create({
      firstName: customer.firstName,
      lastName: customer.lastName,
      businessName: customer.businessName,
      customerType: customer.customerType,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
    });
  });

  users.forEach((user) => {
    User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    }).then((user) => {
      user.setRoles([1]);
    });
  })

  roles.forEach((role, index) => {
    Role.create({
      id: index + 1,
      name: role,
    });
  });

  navs.forEach((role, index) => {
    Nav.create({
      id: index + 1,
      title: role.title,
      icon: role.icon,
      url: role.url,
      roleId: role.roleId,
    });
  });

  homeActions.forEach((action, index) => {
    Home.create({
      id: index + 1,
      title: action.title,
      icon: action.icon,
      url: action.url,
      roleIdd: action.roleId,
    });
  });

  customerFields.forEach((fields, index) => {
    CustomerFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      side: fields.side,
      options: fields.options
    });
  });

  businesses.forEach((business, index) => {
    Business.create({
      name: business.name
    })
  })

  numbers.forEach(number => {
    Number.create({
      type: number.type,
      number: number.number,
      customerId: number.customerId
    })
  })

  customerSettingsFields.forEach((settings, index) => {
    CustomerSettingsFields.create({
      id: index + 1,
      name: settings.name,
      label: settings.label,
      type: settings.type,
      placeholder: settings.placeholder,
      icon: settings.icon,
      side: settings.side,
    })
  })

  User.create({
    firstName: "Omar",
    lastName: "Minaya",
    username: "test",
    email: "test@gmail.com",
    password: "$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy",
  }).then((user) => {
    user.setRoles([3]);
  });
}

module.exports = dbSetup;
