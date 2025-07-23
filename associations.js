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

Country.hasOne(Capital)

sequelize
  .sync({ alter: true })
  .then(() => {
    //Working with updated table
    Country.bulkCreate([
      {
        countryName: "France",
      },
      {
        countryName: "England",
      },
      {
        countryName: "Germany",
      },
      {
        countryName: "Spain",
      },
    ]);
    Capital.bulkCreate([
      {
        capitalName: "Paris",
      },
      {
        capitalName: "London",
      },
      {
        capitalName: "Berlin",
      },
      {
        capitalName: "Madrid",
      },
    ]);
  })
  .catch();
