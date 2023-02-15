module.exports = app => {
    const com = require("../controllers/com.controller");
    const comFields = require("../controllers/fields/com.fields.controller");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();

    router.get("/fields", comFields.findAll);

    //VERIFIED ROUTES
    router.post("/", verifyToken, com.create);
    router.get("/", verifyToken, com.findAll);
    router.get("/id/:id", verifyToken, com.findByTicketId);
    router.get("/author/:id", verifyToken, com.findByAuthorId);
    router.get("/ticket/:id", verifyToken, com.findByTicketId);

    app.use('/api/com', router);
  };