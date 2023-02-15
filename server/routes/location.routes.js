module.exports = app => {
  const location = require("../controllers/location.controller");
  const locationFields = require("../controllers/fields/location.fields.controller");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();

  router.post("/", location.create);
  router.put("/id/:id", location.update);
  router.delete("/id/:id", location.delete);
  router.get("/fields", locationFields.findAll);

  //VERIFIED ROUTES
  router.get("/", verifyToken, location.findAll);
  router.get("/id/:id", verifyToken, location.findByLocationId)

  app.use('/api/location', router);
};