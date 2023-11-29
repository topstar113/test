module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    profilename: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
  });

  return User;
};
