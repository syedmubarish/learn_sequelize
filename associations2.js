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

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { onDelete: "CASCADE" });

let user, post;

sequelize
  .sync({ alter: true })
  .then(() => {
    return User.findOne({ where: { username: "Thor" } });
  })
  .then((data)=>{
    user = data
    return Post.findOne()
  })
  .then((data)=>{
    post = data
    post.setUser(user)
  })
  
  .catch((err) => {
    console.log("Some error occured",err);
  });
