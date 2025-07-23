const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

Country.hasOne(Capital);

let capital, country;

sequelize
  .sync({ alter: true })
  .then(() => {
    //Working with updated table
    return Country.create({
      countryName: "USA",
    });
  })
  .then((data) => {
    country = data;
    country.createCapital({ capitalName: "Washington DC" });
  })

  .catch((err) => {
    console.log("Some error occured:", err);
  });
