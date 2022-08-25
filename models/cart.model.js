const mongoose = require ("mongoose")

const CartSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
       
    },
     productID:{
        type:String
    },
    quantity:{
        type:Number,
        default:1,
    },
    totalPrice:{
        type:String,
    },
    
    date: {
        type: Date,
        default: Date.now
    }
},{timestamp:true})

module.exports = mongoose.model("Cart",CartSchema)