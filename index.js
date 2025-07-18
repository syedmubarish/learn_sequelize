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
    //Inserting data with build and save
    /* 
    const user = User.build({username : "Syed", password : "syedpass", age :25, eligible:true});
    return user.save() 
     */

    // Insering data with create which is (build +save)

    return User.create({
        username : "Thangal",
        password : "thangalpass",
        age : 25,
        eligible : true
    })
  })
  .then((data) => {
    console.log("Saved succesfully");
    data.username = "John" //updating inserted data with save
    data.age = 84
    
    return data.save()  //data.destroy()- deletes the data, data.reload() set returns the original data 
    //Only update specific fields
    // return data.save({fields:['username']})
  })
  .then((data)=>{
    console.log("user updated");
    console.log(data.toJSON());
  })
  .catch(() => {
    console.log("Some error occured");
  });
