function setup(Role, NavItem) {
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
