const Sequelize = require("sequelize")

const sequelize = new Sequelize('sequelizetut','root','iamgroot',
    {
        dialect:"mysql"
    }
)

sequelize.authenticate().then(()=>{
    console.log("connection succesfull");
})
.catch((error)=>{
    console.log("connection failed:",error);
})