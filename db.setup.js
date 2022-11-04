const mysql = require("mysql2");
const db = require("./models/index");
const util = require("util");

const Role = db.role;
const Nav = db.nav;
const User = db.user;
const Home = db.home;
const Customer = db.customer;
const Business = db.business;
const Number = db.number;
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
const phoneTypes = ["Mobile", "Home", "Office", "Fax", "Other"]
const customerTypes = ["Individual", "Business", "School"]
const businesses = [
  {
    name: 'MobileMe IT'
  }
]
const numbers = [{
  type: 'Mobile',
  number: '555-555-5555',
  customerId: 1
}]
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
    roleId: 3,
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
    name: "customerType",
    label: "Customer Type",
    type: "checkbox",
    icon: "bi bi-bar-chart-steps",
    side: 0,
    options: JSON.stringify(customerTypes)
  },
  {
    name: "businessName",
    label: "Business Name",
    type: "text",
    placeholder: "Business Name",
    icon: "bi bi-building",
    side: 0,
  },
  {
    name: "schoolName",
    label: "School Name",
    type: "text",
    placeholder: "School Name",
    icon: "bi bi-mortarboard",
    side: 0,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email Address",
    icon: "bi bi-envelope",
    side: 0,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Phone Number",
    icon: "bi bi-telephone",
    side: 0,
    options: JSON.stringify(phoneTypes)
  },
  {
    name: "address1",
    label: "Address 1",
    type: "text",
    placeholder: "Address 1 (Street Address or P.O. Box)",
    icon: "bi bi-geo-alt",
    side: 1,
  },
  {
    name: "address2",
    label: "Address 2",
    type: "text",
    placeholder: "Address 2 (Apt, Suite, Unit, Building)",
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
  {
    name: "referredBy",
    label: "Referred By",
    type: "text",
    placeholder: "Referral",
    icon: "bi bi-arrow-right-circle",
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
      roleId: role.roleId,
    });
  });

  actions.forEach((action, index) => {
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
