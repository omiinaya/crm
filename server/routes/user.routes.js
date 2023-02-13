const authJwt = require("../middleware/authJWT");
const user = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users/user",
    [authJwt.verifyToken],
    user.userBoard
  );

  router.get("/all", user.findAll);

  app.use('/api/users', router);
};