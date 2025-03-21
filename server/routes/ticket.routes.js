module.exports = app => {

  const ticket = require("../controllers/ticket.controller");
  const ticketFields = require("../controllers/fields/ticket.fields.controller");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();

  //const csurf = require('csurf');
  //const csrfProtection = csurf({ cookie: true })

  //TO VERIFY
  router.post("/", ticket.create);
  router.get("/id/:id", ticket.findByTicketId);
  router.get("/customer/id/:id", ticket.findByCustomerId);

  router.get("/tech/:name", ticket.findByTechName);
  router.get("/tech/id/:id", ticket.findByTechId);

  router.get("/fields", ticketFields.findAll);
  router.put("/id/:id", ticket.update);

  //VERIFIED ROUTES
  router.get("/", verifyToken, ticket.findAll);
  router.get("/asset/id/:id", verifyToken, ticket.findByAssetId);

  //DEV ROUTES
  //router.get("/dev/", ticket.findAll);

  app.use('/api/ticket', router);
};