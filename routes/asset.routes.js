module.exports = app => {
    const assetField = require("../controllers/asset.fields.controller");
    const router = require("express").Router();

    //router.post("/", assetField.create);
    router.get("/fields", assetField.findAll);
    //router.get("/:id", assetField.findByRoleId)
    //router.get("/role/:id", assetField.findByRole)
    //router.put("/:id", assetField.update);
    //router.delete("/:id", assetField.delete);
  
    app.use('/api/asset', router);
  };