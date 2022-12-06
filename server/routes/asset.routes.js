module.exports = app => {
    const asset = require("../controllers/asset.controller");
    const assetFields = require("../controllers/fields/asset.fields.controller");
    const router = require("express").Router();


    //post
    router.post("/", asset.create);

    //get
    router.get("/", asset.findAll);
    router.get("/id/:id", asset.findById)
    router.get("/customer/:id", asset.findByCustomerId);
    router.get("/ticket/:id", asset.findByTicketId);
    router.get("/fields", assetFields.findAll);

    //put
    router.put("/id/:id", asset.update);

    //delete
    router.delete("/id/:id", asset.delete);
    
    app.use('/api/asset', router);
  };