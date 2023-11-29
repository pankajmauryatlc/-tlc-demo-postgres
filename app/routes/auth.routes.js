const { verifySignUp } = require("../middleware");
const {signin,signout,signup} = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
    ],
    signup
  );

  app.post("/api/auth/signin", signin);

  app.post("/api/auth/signout", signout);
};
