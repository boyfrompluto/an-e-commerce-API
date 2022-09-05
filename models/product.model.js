const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema({
   
    productName:{
        type: String,
        required:true,
       
    },
    productPrice:{
        type: Number,
        required:true,
       
    },
    description :{
        type: String,
        required:true,
        
    },
    vendor:{
        type:Object,
        contentType:String,

        
    },
    images:{
        type:Array,
        
    },
    categories:{
        type: Array,
        require: true
    },
    buyers:{
        type:Array
    },
    size:{
        type: String,
       
    }, 
    color:{
        type:String,
       
    },
    date: {
        type: Date,
        default: Date.now
    }
},{timestamp:true})

module.exports = mongoose.model("Product",ProductSchema)