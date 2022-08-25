const mongoose = require ("mongoose")

const OrderSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
       
    },
    cartId:{
        type:String,
        required:true
    },
    amount:{ type:Number},
    address:{ type:Object ,required:true},
    contact:{ type:String,required:true},
    status:{type: String, default:"Pending"},
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order",OrderSchema)