module.exports = app => {
    const number = require("../controllers/number.controller.js");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();

    //TO VERIFY
    router.post("/", number.create);
    router.put("/id/:id", number.update);
    router.delete("/:id", number.delete);

    //VERIFIED ROUTES
    router.get("/", verifyToken, number.findAll);
    router.get("/id/:id", verifyToken, number.findByNumberId);
  
    app.use('/api/number', router);
  };