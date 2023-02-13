module.exports = app => {
    const asset = require("../controllers/asset.controller");
    const assetFields = require("../controllers/fields/asset.fields.controller");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();


    //post
    router.post("/", verifyToken, asset.create);

    //get
    router.get("/", verifyToken, asset.findAll);
    router.get("/id/:id", verifyToken, asset.findById)
    router.get("/customer/:id", verifyToken, asset.findByCustomerId);
    router.get("/ticket/:id", verifyToken, asset.findByTicketId);
    router.get("/fields", verifyToken, assetFields.findAll);

    //put
    router.put("/id/:id", verifyToken, asset.update);

    //delete
    router.delete("/id/:id", verifyToken, asset.delete);
    
    app.use('/api/asset', router);
  };