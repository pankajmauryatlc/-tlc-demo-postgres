
const {pool} = require('../config/db.config')
checkDuplicateEmail = async (req, res, next) => {
  try {
    // Email
    const {email} = req.body
    user = await pool.query('SELECT * FROM users WHERE email = $1',[email])
    if (user?.rows[0]) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};


const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;
