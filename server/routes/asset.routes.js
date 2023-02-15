module.exports = app => {
    const asset = require("../controllers/asset.controller");
    const assetFields = require("../controllers/fields/asset.fields.controller");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();

    router.post("/", asset.create);
    router.get("/fields", assetFields.findAll);
    router.put("/id/:id", asset.update);
    router.delete("/id/:id", asset.delete);

    //VERIFIED ROUTES
    router.get("/", verifyToken, asset.findAll);
    router.get("/id/:id", verifyToken, asset.findById)
    router.get("/customer/:id", verifyToken, asset.findByCustomerId);
    router.get("/ticket/:id", verifyToken, asset.findByTicketId);

    app.use('/api/asset', router);
  };