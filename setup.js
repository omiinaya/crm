function setup(Role, NavItem) {
  const MYSQL = require("mysql2");
  const CONFIG = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
  };

  const connection = MYSQL.createConnection(CONFIG);
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);

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

  NavItem.create({
    title: "Customers",
    icon: "bi bi-person",
    url: "#!",
  });

  NavItem.create({
    title: "Assets",
    icon: "bi bi-laptop",
    url: "#!",
  });

  NavItem.create({
    title: "Invoices",
    icon: "bi bi-cart",
    url: "#!",
  });

  NavItem.create({
    title: "Estimates",
    icon: "bi bi-file-earmark-text",
    url: "#!",
  });

  NavItem.create({
    title: "Tickets",
    icon: "bi bi-tag",
    url: "#!",
  });

  NavItem.create({
    title: "Parts",
    icon: "bi bi-motherboard",
    url: "#!",
  });

  NavItem.create({
    title: "Inventory",
    icon: "bi bi-upc-scan",
    url: "#!",
  });

  NavItem.create({
    title: "POS",
    icon: "bi bi-cash",
    url: "#!",
  });

  NavItem.create({
    title: "Admin",
    icon: "bi bi-gear",
    url: "#!",
  });
}

module.exports = setup;
