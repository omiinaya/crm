module.exports = app => {

  const ticket = require("../controllers/ticket.controller");
  const ticketFields = require("../controllers/fields/ticket.fields.controller");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();
  
  //const csurf = require('csurf');
  //const csrfProtection = csurf({ cookie: true })

  router.post("/", verifyToken, ticket.create);

  router.get("/", verifyToken, ticket.findAll);

  router.get("/id/:id", verifyToken, ticket.findByTicketId);
  router.get("/customer/id/:id", verifyToken, ticket.findByCustomerId);
  //
  router.get("/asset/id/:id", verifyToken, ticket.findByAssetId);
  //
  router.get("/technician/:name", verifyToken, ticket.findByTechnician);
  router.get("/fields", verifyToken, ticketFields.findAll);
  router.put("/id/:id", verifyToken, ticket.update);

  app.use('/api/ticket', router);
};