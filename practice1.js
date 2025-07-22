const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sequelizetut", "root", "iamgroot", {
  dialect: "mysql",
});

const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    favorite_class: {
      type: DataTypes.STRING(25),
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed_to_bititude: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Student.sync({ alter: true })
  .then(() => {
    return Student.findAll({
      attributes: ["name"],
      where: {
        [Op.or]: {
          favorite_class: "Computer Science",
          subscribed_to_bititude: true,
        },
      },
    });
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log("Sync error", err);
  });
