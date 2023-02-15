module.exports = app => {
  const home = require("../controllers/home.controller.js");
  const { verifyToken } = require("../middleware/authJWT");
  const router = require("express").Router();

  router.post("/", home.create);
  router.put("/:id", home.update);
  router.delete("/:id", home.delete);

  //VERIFIED ROUTES
  router.get("/", verifyToken, home.findAll);
  router.get("/:id", verifyToken, home.findByRoleId)
  router.get("/role/:id", verifyToken, home.findByRole)

  app.use('/api/home', router);
};