module.exports = app => {
    const home = require("../controllers/home.controller.js");
    const router = require("express").Router();

    router.post("/", home.create);
    router.get("/", home.findAll);
    router.get("/:id", home.findByRoleId)
    router.get("/role/:id", home.findByRole)
    router.put("/:id", home.update);
    router.delete("/:id", home.delete);
  
    app.use('/api/home', router);
  };