module.exports = app => {
    const nav = require("../controllers/nav.controller.js");
    const router = require("express").Router();

    router.post("/", nav.create);
    router.get("/", nav.findAll);
    router.put("/:id", nav.update);
    router.delete("/:id", nav.delete);
  
    app.use('/api/nav', router);
  };