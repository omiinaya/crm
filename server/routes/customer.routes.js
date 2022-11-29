module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");
  const customerFields = require("../controllers/fields/customer.fields.controller.js");
  const customerSettings = require("../controllers/settings/customer.settings.controller");
  const customerSettingsFields = require("../controllers/fields/customer.settings.fields.controller");
  const router = require("express").Router();

  router.post("/", customer.create);
  router.get("/", customer.findAll);
  router.get("/id/:id", customer.findByRoleId);
  router.get("/role/:id", customer.findByRole);
  router.put("/:id", customer.update);
  router.delete("/:id", customer.delete);

  //fields get
  router.get("/fields", customerFields.findAll);

  //settings get
  router.get("/settings/id/:id", customerSettings.findById);
  router.get("/settings/fields", customerSettingsFields.findAll);

  //settings post
  router.post("/settings", customerSettings.create);
  router.post("/settings/fields", customerSettingsFields.create);

  app.use("/api/customers", router);
};
