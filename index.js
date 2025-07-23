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
  },
  {
    freezeTableName: true,
    timestamps: false,
    validate: {
      usernamePasswordMatch() {
        if (this.username == this.password)
          throw new Error("Password and username cannot be same");
      },
    },
  }
);

function myfunc() {
  console.log(`Running RAW sql`);
}

User.sync({ alter: true })
  .then(() => {
    return sequelize.query(`SELECT * FROM user WHERE user_id IN(:user_id)`, {
      type: Sequelize.QueryTypes.SELECT,
      model: User,
      logging: myfunc,
      replacements:{user_id:[28,30]}
    });
  })
  .then((data) => {
    data.forEach(element => {
        
        console.log(element.toJSON());
    });
  })
  .catch((error) => {
    console.log("Some error occured", error);
  });
