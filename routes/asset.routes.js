module.exports = app => {
    const asset = require("../controllers/asset.controller");
    const assetFields = require("../controllers/fields/asset.fields.controller");
    const router = require("express").Router();

    router.post("/", asset.create);
    router.get("/fields", assetFields.findAll);
    //router.get("/:id", assetField.findByRoleId)
    //router.get("/role/:id", assetField.findByRole)
    //router.put("/:id", assetField.update);
    //router.delete("/:id", assetField.delete);
  
    app.use('/api/asset', router);
  };