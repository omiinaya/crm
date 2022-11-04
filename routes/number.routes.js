module.exports = app => {
    const number = require("../controllers/number.controller.js");
    const router = require("express").Router();

    router.post("/", number.create);
    router.get("/", number.findAll);
    router.get("/:id", number.findByRoleId)
    router.get("/role/:id", number.findByRole)
    router.put("/:id", number.update);
    router.delete("/:id", number.delete);
  
    app.use('/api/number', router);
  };