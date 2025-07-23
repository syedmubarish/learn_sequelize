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
Capital.belongsTo(Country);

let capital, country;

sequelize
  .sync({ alter: true })
  .then(() => {
    return Country.findOne({ where: { countryName: "England" } });
  })
  .then((data) => {
    country = data;
    return Capital.findOne({ where: { capitalName: "London" } });
  })
  .then((data) => {
    capital = data
    capital.setCountry(country)
  })

  .catch((err) => {
    console.log("Some error occured:", err);
  });
