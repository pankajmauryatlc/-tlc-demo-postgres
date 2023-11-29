const { authJwt } = require("../middleware");
const {users,updateUserDetails} = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/users",
    [authJwt.verifyToken],
    users
  );
  app.post(
    "/api/test/updateUser",
    [authJwt.verifyToken],
    updateUserDetails
  );
};
