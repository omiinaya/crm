const mysql = require("mysql2");
const db = require("../models/index");
const util = require("util");

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

  const users = await import("./users.data.js");
  const usersData = users.default;

  const roles = await import("./roles.data.js");
  const rolesData = roles.default;

  const navs = await import("./navs.data.js");
  const navsData = navs.default;

  const homeActions = await import("./actions/home.actions.data.js");
  const homeActionsData = homeActions.default;

  const businesses = await import("./businesses.data.js");
  const businessesData = businesses.default;

  const numbers = await import("./numbers.data.js");
  const numbersData = numbers.default;

  const locations = await import("./locations.data.js");
  const locationsData = locations.default;

  const assets = await import("./assets.data.js");
  const assetsData = assets.default;

  const tickets = await import("./tickets.data.js");
  const ticketsData = tickets.default;

  const coms = await import("./coms.data.js");
  const comsData = coms.default;

  //FIELDS
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

  //DATA
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

  usersData.forEach((user) => {
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

  rolesData.forEach((role, index) => {
    Role.create({
      id: index + 1,
      name: role,
    });
  });

  navsData.forEach((role, index) => {
    Nav.create({
      id: index + 1,
      title: role.title,
      icon: role.icon,
      url: role.url,
      roleId: role.roleId,
    });
  });

  homeActionsData.forEach((action, index) => {
    HomeActions.create({
      id: index + 1,
      title: action.title,
      icon: action.icon,
      url: action.url,
      roleIdd: action.roleId,
    });
  });

  businessesData.forEach((business) => {
    Business.create({
      name: business.name,
    });
  });

  numbersData.forEach((number, index) => {
    Number.create({
      id: index + 1,
      type: number.type,
      number: number.number,
      customerId: number.customerId,
    });
  });

  assetsData.forEach((asset) => {
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

  ticketsData.forEach((ticket) => {
    Ticket.create({
      ticketCustomerId: ticket.ticketCustomerId,
      ticketTitle: ticket.ticketTitle,
      ticketStatus: ticket.ticketStatus,
      ticketType: ticket.ticketType,
      ticketDesc: ticket.ticketDesc,
      ticketTech: ticket.ticketTech,
    });
  });

  comsData.forEach((com) => {
    Com.create({
      comVis: com.comVis,
      comType: com.comType,
      comMsg: com.comMsg,
      comAuthorId: com.comAuthorId,
      comTicketId: com.comTicketId,
      comAuthorName: com.comAuthorName
    });
  });

  locationsData.forEach((location, index) => {
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
