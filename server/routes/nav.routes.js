module.exports = app => {
    const nav = require("../controllers/nav.controller.js");
    const { verifyToken } = require("../middleware/authJWT");
    const router = require("express").Router();

    router.post("/", nav.create);
    //
    router.get("/", verifyToken, nav.findAll);
    router.get("/:id", verifyToken, nav.findByRoleId)
    router.get("/role/:id", verifyToken, nav.findByRole)
    //
    router.put("/:id", nav.update);
    router.delete("/:id", nav.delete);
  
    app.use('/api/nav', router);
  };