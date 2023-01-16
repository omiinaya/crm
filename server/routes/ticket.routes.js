module.exports = app => {
    const ticket = require("../controllers/ticket.controller");
    const ticketFields = require("../controllers/fields/ticket.fields.controller");
    const router = require("express").Router();

    router.post("/", ticket.create);
    router.get("/", ticket.findAll);
    router.get("/id/:id", ticket.findByTicketId);
    router.get("/customer/:id", ticket.findByCustomerId);
    router.get("/technician/:name", ticket.findByTechnician);
    router.get("/fields", ticketFields.findAll);
    router.put("/id/:id", ticket.update);
  
    app.use('/api/ticket', router);
  };