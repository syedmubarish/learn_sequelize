const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

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
    console.log("Table synced according to model");
    return User.bulkCreate(
      [
        {
          username: "Thangal",
          password: "thangalpass",
          age: 25,
          eligible: true,
        },
        {
          username: "Tom vercity",
          password: "Tommy",
          age: 32,
          eligible: false,
        },
      ],
      { validate: true }
    );
  })

  .then((data) => {
    console.log("users saved");
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((error) => {
    console.log("Some error occured",error);
  });
