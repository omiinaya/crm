const mysql = require("mysql2");
const db = require("./models/index");
const util = require("util");

const Role = db.role;
const Nav = db.nav;
const User = db.user;
const Home = db.home;
const Customer = db.customer;
const CustomerFields = db.customerFields;

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

const roles = ["user", "moderator", "admin"];
const actions = [
  {
    title: "New Customer",
    icon: "bi bi-person",
    url: "newCustomerView",
  },
  {
    title: "New Ticket",
    icon: "bi bi-tag",
    url: "newTicketView",
  },
  {
    title: "New Check In",
    icon: "bi bi-check-square",
    url: "newCheckinView",
  },
  {
    title: "New Invoice",
    icon: "bi bi-cart",
    url: "newInvoiceView",
  },
  {
    title: "New Estimate",
    icon: "bi bi-file-earmark-text",
    url: "newEstimateView",
  },
];
const navs = [
  {
    id: 0,
    title: "Home",
    icon: "bi bi-house",
    url: "homeView",
  },
  {
    id: 1,
    title: "Customers",
    icon: "bi bi-person",
    url: "customersView",
  },
  {
    id: 2,
    title: "Assets",
    icon: "bi bi-laptop",
    url: "assetsView",
  },
  {
    id: 3,
    title: "Invoices",
    icon: "bi bi-cart",
    url: "invoicesView",
  },
  {
    id: 4,
    title: "Estimates",
    icon: "bi bi-file-earmark-text",
    url: "estimatesView",
  },
  {
    id: 5,
    title: "Tickets",
    icon: "bi bi-tag",
    url: "ticketsView",
  },
  {
    id: 6,
    title: "Parts",
    icon: "bi bi-motherboard",
    url: "partsView",
  },
  {
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
  },
  {
    id: 9,
    title: "Admin",
    icon: "bi bi-gear",
    url: "adminView",
    role_id: 3,
  },
];
const customers = [
  {
    firstName: "Test",
    lastName: "ing",
    businessName: "Testing",
    email: "testing@gmail.com",
    phone: "555-555-555",
    address: "404 test street",
    city: "test city",
    state: "Florida",
    zip: "33015",
  },
  {
    firstName: "Test 2",
    lastName: "ing 2",
    businessName: "Testing 2",
    email: "testing2@gmail.com",
    phone: "655-555-555",
    address: "405 test street",
    city: "test city",
    state: "Florida",
    zip: "33015",
  },
];

const customerFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
    icon: "bi bi-person",
    side: 0,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    icon: "bi bi-person",
    side: 0,
  },
  {
    name: "businessName",
    label: "Business",
    type: "text",
    placeholder: "Business",
    icon: "bi bi-building",
    side: 0,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    icon: "bi bi-envelope",
    side: 0,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Number",
    icon: "bi bi-telephone",
    side: 0,
  },
  {
    name: "address1",
    label: "Address 1",
    type: "text",
    placeholder: "Address (Street Address or P.O. Box)",
    icon: "bi bi-geo-alt",
    side: 1,
  },
  {
    name: "address2",
    label: "Address 2",
    type: "text",
    placeholder: "Address (Street Address or P.O. Box)",
    icon: "bi bi-geo-alt",
    side: 1,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "City",
    icon: "bi bi-geo-alt",
    side: 1,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "State",
    icon: "bi bi-geo-alt",
    side: 1,
  },
  {
    name: "zip",
    label: "Zip Code",
    type: "text",
    placeholder: "Zip Code",
    icon: "bi bi-geo-alt",
    side: 1,
  },
];

function dummyData() {
  customers.forEach((customer) => {
    Customer.create({
      firstName: customer.firstName,
      lastName: customer.lastName,
      businessName: customer.businessName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
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
      role_id: role.role_id,
    });
  });

  actions.forEach((action, index) => {
    Home.create({
      id: index + 1,
      title: action.title,
      icon: action.icon,
      url: action.url,
      role_id: action.role_id,
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
    });
  });

  User.create({
    firstName: "test",
    lastName: "ing",
    username: "test",
    email: "test@gmail.com",
    password: "$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy",
  }).then((user) => {
    user.setRoles([3]);
  });
}

module.exports = dbSetup;
