module.exports = app => {
    const number = require("../controllers/number.controller.js");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();

    router.post("/", number.create);
    //
    router.get("/", verifyToken, number.findAll);
    router.get("/id/:id", verifyToken, number.findByNumberId);
    //
    router.put("/id/:id", number.update);
    router.delete("/:id", number.delete);
  
    app.use('/api/number', router);
  };