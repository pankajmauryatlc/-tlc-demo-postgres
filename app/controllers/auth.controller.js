
const config = require("../config/auth.config");
const Joi = require("@hapi/joi")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {pool} = require('../config/db.config');

exports.signup = async (req, res) => {
  // Save User to Database  
  try {   
      const schema = {
        username : Joi.string().min(4).required(),
        email: Joi.string().min(4).required(),
        password: Joi.string().min(4).required()
    };
    
     const {error} =  Joi.validate(req.body,schema);
      if(error){
        return res.status(400).send({errors:error.details[0].message});
    }
    const {username,email,password} = req.body;
    pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3) RETURNING *', [username, email,bcrypt.hashSync(password, 8)], (error, results) => {
      if (error) {
        throw error
      }
      if (results?.rows[0]?.id) res.send({ message: "User registered successfully!" });
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const {email,password} = req.body;
    pool.query('SELECT * FROM users WHERE email = $1',[email],(error,result)=>{
      if (!result.rows[0]) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        password,
        result?.rows[0]?.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
  
      const token = jwt.sign({ id: result?.rows[0]?.id },
                             config.secret,
                             {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                             });
  
     
  
      req.session.token = token;
      return res.status(200).send({
        id: result?.rows[0]?.id,
        username: result?.rows[0].username,
        email: result?.rows[0].email,
        _token:token
      });
    })
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
