module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");
  const customerFields = require("../controllers/fields/customer.fields.controller.js");
  const customerSettings = require("../controllers/settings/customer.settings.controller");
  const customerSettingsFields = require("../controllers/fields/customer.settings.fields.controller");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();

  router.post("/", customer.create);


  router.get("/", verifyToken, customer.findAll);
  router.get("/id/:id", verifyToken, customer.findById);
  router.get("/role/:id", verifyToken, customer.findByRole);
  router.put("/id/:id", customer.update);
  
  //
  router.get("/asset/id/:id", customer.findByAssetId);
  //
  
  router.delete("/id/:id", customer.delete);
  //fields get
  router.get("/fields", customerFields.findAll);

  //settings get
  router.get("/settings/id/:id", customerSettings.findById);
  router.get("/settings/fields", customerSettingsFields.findAll);

  //settings post
  router.post("/settings", customerSettings.create);
  router.post("/settings/fields", customerSettingsFields.create);

  app.use("/api/customer/", router);
};
