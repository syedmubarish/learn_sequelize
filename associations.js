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
    return Country.findOne({ where: { countryName: "Germany" } });
  })
  .then((data) => {
    country = data;
    return Capital.findOne({ where: { capitalName: "Berlin" } });
  })
  .then((data)=>{
    capital = data
    country.setCapital(capital)
  })
  .catch((err) => {
    console.log("Some error occured:", err);
  });
