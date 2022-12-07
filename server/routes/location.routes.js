module.exports = app => {
    const location = require("../controllers/location.controller");
    const locationFields = require("../controllers/fields/location.fields.controller");
    const router = require("express").Router();

    router.post("/", location.create);
    router.get("/", location.findAll);
    router.get("/id/:id", location.findByLocationId)
    router.put("/id/:id", location.update);
    router.delete("/id/:id", location.delete);

    //fields
    router.get("/fields", locationFields.findAll);
  
    app.use('/api/locations', router);
  };