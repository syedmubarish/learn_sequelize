const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});

const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const CustomerProduct = sequelize.define(
  "customerproduct",
  {
    customerproductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

Product.belongsToMany(Customer, { through: CustomerProduct });
Customer.belongsToMany(Product, { through: CustomerProduct });

sequelize
  .sync({ alter: true })
  .then(() => {
    Customer.bulkCreate([
      { customerName: "Ironman" },
      { customerName: "Thor" },
      { customerName: "Spiderman" },
      { customerName: "Hawkeye" },
    ]);
    Product.bulkCreate([
      { productName: "Mjolnir" },
      { productName: "Suit" },
      { productName: "Bow" },
      { productName: "Storm Breaker" },
      { productName: "Arrow" },
      { productName: "Gadget" },
    ]);
  })
  .catch((err) => {
    console.log("Some error occured : ", err);
  });
