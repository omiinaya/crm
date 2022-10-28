

function setup(db) {
  const Role = db.role;
  const Nav = db.nav;
  const User = db.user;

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
    firstName: 'test',
    lastName: 'ing',
    username: 'test',
    email: 'test@gmail.com',
    password: '$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy'
  })
}

module.exports = setup;
