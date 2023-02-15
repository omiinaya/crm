module.exports = app => {
  const nav = require("../controllers/nav.controller.js");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();

  //TO VERIFY
  router.post("/", nav.create);
  router.put("/id/:id", nav.update);
  router.delete("/id/:id", nav.delete);

  //VERIFIED ROUTES
  router.get("/", verifyToken, nav.findAll);
  router.get("/role/:id", verifyToken, nav.findByRoleId)

  /*DEV ROUTES*/
  //router.get("/dev/", nav.findAll);
  //router.get("/role/dev/:id", nav.findByRoleId)

  app.use('/api/nav', router);
};