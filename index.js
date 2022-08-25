const express = require("express");
const config = require("./config/config");
const mongoose = require("mongoose");
const user= require("./routes/user.route");
const auth= require("./routes/user.auth");
const product= require("./routes/products.route");
const cart= require("./routes/cart.route")
const order= require("./routes/order.route")



const app= express();

const theDB = "mongodb://localhost:27017/ecomm" || config.dbUri;

mongoose.connect(theDB).then(()=>console.log('connected to db')).catch((err)=>console.log(err))


const port= config.port||4004
app.use(express.json())

app.use("/api/user",user)
app.use("/api/auth",auth)
app.use("/api/product",product)
app.use("/api/cart",cart)
app.use("/api/order",order)

app.listen(port,()=>{
    console.log(`running on port ${port}`);
})