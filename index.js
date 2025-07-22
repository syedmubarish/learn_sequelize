const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 16],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
    return User.destroy({truncate : true});
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Some error occured", error);
  });
