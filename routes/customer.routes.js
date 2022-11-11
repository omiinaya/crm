module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");
  const customerFields = require("../controllers/customer.fields.controller.js");
  const customerSettings = require("../controllers/customer.settings.controller");
  const customerSettingsFields = require('../controllers/customer.settings.fields.controller');
  const router = require("express").Router();

  router.post("/", customer.create);
  router.get("/", customer.findAll);
  router.get("/fields", customerFields.findAll);
  router.get("/settings/id/:id", customerSettings.findById)
  router.get("/settings/fields", customerSettingsFields.findAll);
  router.get("/:id", customer.findByRoleId);
  router.get("/role/:id", customer.findByRole);
  router.put("/:id", customer.update);
  router.delete("/:id", customer.delete);

  app.use("/api/customer", router);
};
