const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define(
  "post",
  {
    post: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Post);
Post.belongsTo(User);

let user, post;

sequelize
  .sync({ alter: true })
  .then(() => {
    return User.findOne({ where: { username: "Ironman" } });
  })
  .then((data) => {
    user = data 
    return user.countPosts()
  })
  .then((data)=>{
    console.log(data);
    
    
  })
  .catch((err) => {
    console.log("Some error occured");
  });
