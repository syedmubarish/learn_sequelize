const Sequelize = require("sequelize");

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});



//Creating model with define
const User = sequelize.define(
  "user",
  {
    user_id: {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 18,
    },
    eligible:{
        type:Sequelize.DataTypes.BOOLEAN,
        defaultValue : true
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

//Inserting table into Db using sync

User.sync({force:true})
  .then(() => {
    console.log("Table synced according to model");
  })
  .catch(() => {
    console.log("Some error occured");
  });

