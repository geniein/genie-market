module.exports = function (sequelize, DataTypes) {
    const account = sequelize.define("Account", {
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      pwd: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      }      
    });
    return account;
  };
  