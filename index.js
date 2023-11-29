const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
 require('dotenv').config();
const app = express();

app.use(cors());

// set port, listen for requests
const PORT = process.env.PORT || 3000;
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended:   true }));

app.use(
  cookieSession({
    name: "login-app",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
// db.sequelize.sync({force:false});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "app is live now" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//initial();      
