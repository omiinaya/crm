

function setup(db) {
  const Role = db.role;
  const NavItem = db.navItem;
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

  User.create({
    firstName: 'test',
    lastName: 'ing',
    username: 'test',
    email: 'test@gmail.com',
    password: '$2a$08$7O/xmmuyMmc4PuCF2dcPxue3bHuGmQvvn1M2AidQnYzNE.QC7bTyy'
  })
}

module.exports = setup;
