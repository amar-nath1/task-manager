
const express=require('express')
require('dotenv').config()
const admin=require('./routes/todoRoutes')
const sequelize=require('./util/database')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json());
app.use(admin.routes)

sequelize.sync().then((res)=>{
    
    app.listen(4000);
}).catch((err)=>{
    console.log(err,'got error')
})
