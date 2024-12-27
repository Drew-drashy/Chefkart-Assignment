const {Sequelize, DataTypes}=require('sequelize');
require('dotenv').config(); // Load .env variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
    }
  );

const User=sequelize.define('User',{
    id:{type: DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name: {type: DataTypes.STRING(256),allowNull:false},
    mobile_number:{type:DataTypes.BIGINT,unique:true,allowNull:false},
    address: {type:DataTypes.TEXT},
    post_count:{type: DataTypes.INTEGER, defaultValue:0}
},{
    timestamps:true,
});

module.exports={User, sequelize};