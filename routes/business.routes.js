module.exports = app => {
    const business = require("../controllers/business.controller.js");
    const router = require("express").Router();

    router.post("/", business.create);
    router.get("/", business.findAll);
    router.get("/:id", business.findByRoleId)
    router.get("/role/:id", business.findByRole)
    router.put("/:id", business.update);
    router.delete("/:id", business.delete);
  
    app.use('/api/business', router);
  };