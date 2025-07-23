const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const zlib = require("node:zlib");
const bcrypt = require("bcrypt");

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
      //   get() {
      //     const rawValue = this.getDataValue("username");
      //     return rawValue.toUpperCase();
      //   },
    },
    password: {
      type: DataTypes.STRING,
      //   set(value) {
      //     const salt = bcrypt.genSaltSync(12);
      //     const hash = bcrypt.hashSync(value, salt);
      //     this.setDataValue("password", hash);
      //   },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
      validate: {
        isOld(value) {
          if (value < 18) throw new Error("Not matured");
        },
      },
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      set(value) {
        const compressedData = zlib.deflateSync(value).toString("base64");
        this.setDataValue("description", compressedData);
      },
      get() {
        const value = this.getDataValue("description");
        if (!value) return null;
        return zlib.inflateSync(Buffer.from(value, "base64")).toString();
      },
    },
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} - ${this.description}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    deletedAt: "destroyedAt",
    validate: {
      usernamePasswordMatch() {
        if (this.username == this.password)
          throw new Error("Password and username cannot be same");
      },
    },
  }
);

User.sync({ alter: true })
  .then(() => {
    return User.findAll({ where: {username : 'SyedIzzan'} });
  })
  .then((data) => {
    // console.log(data);

    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((error) => {
    console.log("Some error occured", error);
  });
