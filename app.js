
const express=require('express')
const admin=require('./routes/todoRoutes')
const sequelize=require('./util/database')
const app=express()

app.use(admin.routes)


sequelize.sync().then((res)=>{
    
    app.listen(4000);
}).catch((err)=>{
    console.log(err,'got error')
})
