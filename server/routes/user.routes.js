const authJwt = require("../middleware/authJWT");
const user = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authJWT");
const router = require("express").Router();

module.exports = function (app) {
  router.get("/", verifyToken, user.findAll);

  app.use('/api/users', router);
};