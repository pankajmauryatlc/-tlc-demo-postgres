
const {pool} = require('../config/db.config')
exports.users = async(req, res) => {
  try{ 
    const users = await pool.query(`SELECT id,username,email FROM users`);
    if(users?.rows){
      res.status(200).send({data:users?.rows});
    }

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateUserDetails = async(req, res) => {
  try{ 
    console.log(req.userId);
    const userId = req.userId
    const {username} = req.body;
    const user = await pool.query(`UPDATE users set username =$1 where id=$2 RETURNING id,username,email`,[username,userId])
    if(user?.rows[0])
    res.status(200).send({ message: "User updated successfully!",data:user.rows[0]});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

