module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created_at:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull:true, 
    }
});

  return User;
};
