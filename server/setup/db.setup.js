const mysql = require("mysql2");
const db = require("../models/index");
const util = require("util");

//data
const navs = require('./nav.data');
const users = require('./users.data');
const roles = require('./roles.data');
const assets = require('./assets.data');
const tickets = require('./tickets.data');
const numbers = require('./numbers.data');
const customers = require('./customers.data');
const businesses = require('./businesses.data');

//actions
const homeActions = require('./actions/home.actions.data');

//fields
const assetFields = require("./fields/asset.fields.data");
const ticketFields = require('./fields/ticket.fields.data');
const customerFields = require('./fields/customer.fields.data');
const locationFields = require('./fields/location.fields.data');
const customerSettingsFields = require('./fields/customer.settings.fields');

const Role = db.role;
const Nav = db.nav;
const User = db.user;
const Home = db.home;
const Asset = db.asset;
const Ticket = db.ticket;
const Customer = db.customer;
const Business = db.business;
const Number = db.number;
const CustomerFields = db.customerFields;
const LocationFields = db.locationFields;
const CustomerSettingsFields = db.customerSettingsFields;
const AssetFields = db.assetFields;
const TicketFields = db.ticketFields;

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

  locationFields.forEach((fields, index) => {
    LocationFields.create({
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

  ticketFields.forEach((fields, index) => {
    TicketFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      side: fields.side,
      show: fields.show,
      options: fields.options
    });
  });

  businesses.forEach(business => {
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

  assetFields.forEach((fields, index) => {
    AssetFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      side: fields.side,
      options: fields.options,
      data: fields.data,
      show: fields.show
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
      options: settings.options
    })
  })

  assets.forEach(asset => {
    Asset.create({
      assetCustomerId: asset.assetCustomerId,
      assetTicketNumber: asset.assetTicketNumber,
      assetType: asset.assetType,
      assetBrand: asset.assetBrand,
      assetName: asset.assetName,
      assetSerial: asset.assetSerial,
      assetTag: asset.assetTag
    })
  })

  tickets.forEach(ticket => {
    Ticket.create({
      ticketCustomerId: ticket.ticketCustomerId,
      ticketTitle: ticket.ticketTitle,
      ticketStatus: ticket.ticketStatus,
      ticketType: ticket.ticketType,
      ticketDesc: ticket.ticketDesc,
      ticketTech: ticket.ticketTech
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
