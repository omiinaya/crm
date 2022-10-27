module.exports = app => {
    const navItems = require("../controllers/navItem.controller.js");
    const router = require("express").Router();

    router.post("/", navItems.create);
    router.get("/", navItems.findAll);
    router.put("/:id", navItems.update);
    router.delete("/:id", navItems.delete);
  
    app.use('/api/navItems', router);
  };