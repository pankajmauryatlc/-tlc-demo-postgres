const db = require("../models");
const User = db.user;
exports.users = async(req, res) => {
  try{ 
    const users = await User.findAll({});
    res.status(200).send({data:users});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateUserDetails = async(req, res) => {
  try{ 
    console.log(req.userId);
    const userId = req.userId
    console.log("{id:userId},",userId)
    const {username} = req.body;
    const user = await User.update({username:username},{where:{id:userId}});
    if(user)
    res.status(200).send({ message: "User updated successfully!"});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

