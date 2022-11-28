module.exports = app => {
    const location = require("../controllers/location.controller.js");
    const router = require("express").Router();

    router.post("/", location.create);
    router.get("/", location.findAll);
    router.get("/:id", location.findByRoleId)
    router.get("/role/:id", location.findByRole)
    router.put("/:id", location.update);
    router.delete("/:id", location.delete);
  
    app.use('/api/location', router);
  };