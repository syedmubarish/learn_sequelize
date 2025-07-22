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
      get() {
        const rawValue = this.getDataValue("username");
        return rawValue.toUpperCase();
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
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
        return zlib.inflateSync(Buffer.from(value, "base64")).toString();
      },
    },
    aboutUser : {
        type : DataTypes.VIRTUAL,
        get(){
            return `${this.username} - ${this.description}`
        }
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
    return User.findOne({where : {username : "JohnDRockyfeller"}});
  })
  .then((data) => {
    console.log(data.aboutUser);
  })
  .catch((error) => {
    console.log("Some error occured", error);
  });
