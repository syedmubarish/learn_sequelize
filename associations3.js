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

let customer, product;

sequelize
  .sync({ alter: true })
  .then(() => {
    return Customer.destroy({ where: { customerName: "Spiderman" } });
  })
  .then((data) => {
    console.log(data);
    
  })
  .catch((err) => {
    console.log("Some error occured : ", err);
  });
