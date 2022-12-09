module.exports = app => {
    const com = require("../controllers/com.controller");
    const comFields = require("../controllers/fields/com.fields.controller");
    const router = require("express").Router();

    router.post("/", com.create);
    router.get("/", com.findAll);
    router.get("/id/:id", com.findByTicketId);
    router.get("/author/:id", com.findByAuthorId);
    router.get("/ticket/:id", com.findByTicketId);
    router.get("/fields", comFields.findAll);
  
    app.use('/api/com', router);
  };