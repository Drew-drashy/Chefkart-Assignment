const express=require('express');
const bodyParser=require('body-parser');
const {sequelize}=require('./Models/userModel');

const app=express();
app.use(bodyParser.json()); // for data handling in json or objects and all.

sequelize.sync({force: false}).then(()=>{
    console.log('Database Connected Succesfully!');
}).catch((err)=>{
    console.log(err,'error in connection of database');
})

const userRoutes=require('./Routes/userRoutes');
const postRoutes=require('./Routes/postRoutes');

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})