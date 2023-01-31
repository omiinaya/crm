const mysql = require("mysql2");
const db = require("../models/index");
const util = require("util");

//data
const navs = require("./nav.data");
const coms = require("./coms.data");
const users = require("./users.data");
const roles = require("./roles.data");
const assets = require("./assets.data");
const tickets = require("./tickets.data");
const numbers = require("./numbers.data");
const locations = require("./locations.data");
const customers = require("./customers.data");
const businesses = require("./businesses.data");

//actions
const homeActions = require("./actions/home.actions.data");

//fields
//const comFields = require("./fields/com.fields.data");
//const assetFields = require("./fields/asset.fields.data");
//const ticketFields = require("./fields/ticket.fields.data");
//const customerFields = require("./fields/customer.fields.data");
//const locationFields = require("./fields/location.fields.data");
//const customerSettingsFields = require("./fields/customer.settings.fields");


const Nav = db.nav;
const Com = db.com;
const Role = db.role;
const User = db.user;
const Asset = db.asset;
const Ticket = db.ticket;
const Number = db.number;
const HomeActions = db.homeActions;
const Customer = db.customer;
const Business = db.business;
const Location = db.location;
const ComFields = db.comFields;
const AssetFields = db.assetFields;
const TicketFields = db.ticketFields;
const CustomerFields = db.customerFields;
const LocationFields = db.locationFields;
const CustomerSettingsFields = db.customerSettingsFields;

const config = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
};

const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

async function setup() {
  await query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);
  console.log(config)
  //comment force:true to stop resetting the database on server restart
  db.sequelize.sync({ force: true }).then(() => dummyData());
}

async function dummyData() {
  const customerFields = await import("./fields/customer.fields.data.js");
  const customerFieldsData = customerFields.default;

  const locationFields = await import("./fields/location.fields.data.js");
  const locationFieldsData = locationFields.default;

  const ticketFields = await import("./fields/ticket.fields.data.js");
  const ticketFieldsData = ticketFields.default;

  const assetFields = await import("./fields/asset.fields.data.js");
  const assetFieldsData = assetFields.default;

  const customerSettingsFields = await import("./fields/customer.settings.fields.js");
  const customerSettingsFieldsData = customerSettingsFields.default;

  const comFields = await import("./fields/com.fields.data.js");
  const comFieldsData = comFields.default;

  const customers = await import("./customers.data.js");
  const customersData = customers.default;

  //FIELDS:
  customerFieldsData.forEach((fields, index) => {
    CustomerFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      show: fields.show,
      allowNull: fields.allowNull,
      options: fields.options,
    });
  });

  locationFieldsData.forEach((fields, index) => {
    LocationFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      options: fields.options,
    });
  });

  ticketFieldsData.forEach((fields, index) => {
    TicketFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      show: fields.show,
      allowNull: fields.allowNull,
      options: fields.options,
    });
  });

  assetFieldsData.forEach((fields, index) => {
    AssetFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      options: fields.options,
      data: fields.data,
      show: fields.show,
      allowNull: fields.allowNull,
    });
  });

  customerSettingsFieldsData.forEach((settings, index) => {
    CustomerSettingsFields.create({
      id: index + 1,
      name: settings.name,
      label: settings.label,
      type: settings.type,
      placeholder: settings.placeholder,
      icon: settings.icon,
      side: settings.side,
      options: settings.options,
    });
  });

  comFieldsData.forEach((fields, index) => {
    ComFields.create({
      id: index + 1,
      name: fields.name,
      label: fields.label,
      type: fields.type,
      placeholder: fields.placeholder,
      icon: fields.icon,
      options: fields.options,
    });
  });

  // data
  customersData.forEach((customer, index) => {
    Customer.create({
      id: index + 1,
      firstName: customer.firstName,
      lastName: customer.lastName,
      businessName: customer.businessName,
      customerType: customer.customerType,
      email: customer.email,
      primaryPhone: customer.primaryPhone,
      primaryAddress: customer.primaryAddress,
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
  });

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
    HomeActions.create({
      id: index + 1,
      title: action.title,
      icon: action.icon,
      url: action.url,
      roleIdd: action.roleId,
    });
  });

  businesses.forEach((business) => {
    Business.create({
      name: business.name,
    });
  });

  numbers.forEach((number, index) => {
    Number.create({
      id: index + 1,
      type: number.type,
      number: number.number,
      customerId: number.customerId,
    });
  });

  assets.forEach((asset) => {
    Asset.create({
      assetCustomerId: asset.assetCustomerId,
      assetTicketId: asset.assetTicketId,
      assetType: asset.assetType,
      assetBrand: asset.assetBrand,
      assetName: asset.assetName,
      assetSerial: asset.assetSerial,
      assetTag: asset.assetTag,
    });
  });

  tickets.forEach((ticket) => {
    Ticket.create({
      ticketCustomerId: ticket.ticketCustomerId,
      ticketTitle: ticket.ticketTitle,
      ticketStatus: ticket.ticketStatus,
      ticketType: ticket.ticketType,
      ticketDesc: ticket.ticketDesc,
      ticketTech: ticket.ticketTech,
    });
  });

  coms.forEach((com) => {
    Com.create({
      comVis: com.comVis,
      comType: com.comType,
      comMsg: com.comMsg,
      comAuthorId: com.comAuthorId,
      comTicketId: com.comTicketId,
      comAuthorName: com.comAuthorName
    });
  });

  locations.forEach((location, index) => {
    Location.create({
      id: index + 1,
      address1: location.address1,
      address2: location.address2,
      country: location.country,
      state: location.state,
      city: location.city,
      zip: location.zip,
    });
  });

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

module.exports = setup;
