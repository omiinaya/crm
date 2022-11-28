module.exports = app => {
    const ticket = require("../controllers/ticket.controller");
    const ticketFields = require("../controllers/fields/ticket.fields.controller");
    const router = require("express").Router();

    router.post("/", ticket.create);
    router.get("/", ticket.findAll);
    router.get("/fields", ticketFields.findAll);
    //router.get("/:id", assetField.findByRoleId)
    //router.get("/role/:id", assetField.findByRole)
    //router.put("/:id", assetField.update);
    //router.delete("/:id", assetField.delete);
  
    app.use('/api/ticket', router);
  };