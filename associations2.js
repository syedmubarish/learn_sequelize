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

sequelize
  .sync({ alter: true })
  .then(() => {
    User.bulkCreate([
      {
        username: "Ironman",
        password: "Mark5",
      },
      {
        username: "Spiderman",
        password: "Spidey123",
      },
      {
        username: "Hulk",
        password: "BannerSmash",
      },
      {
        username: "Thor",
        password: "Mjolnir",
      },
    ]);

    Post.bulkCreate([
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
      {
        post: "We are avengers",
      },
    ]);
  })
  .catch((err) => {
    console.log("Some error occured");
  });
