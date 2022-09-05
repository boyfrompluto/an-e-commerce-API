const User = require("../models/user.model");
const Product= require("../models/product.model");

const product=async()=>{
    
    const products = await Product.find();
    var pro=0
    for(var i=pro;i<products.length;i++){
        if(pro<products[i].buyers.length){
            pro=products[i].buyers.length
            console.log(products[i].productName,pro)
        }
    }
    
};
const unverifiedUser =async()=>{
    var arr=[];
    const users = await User.find();
    for(var i=0;i<users.length;i++){
        if(users[i].verified==false){
            arr.push(users[i]._id)
            console.log(arr.length)
        }
    }

};


module.exports={
    unverifiedUser,
    product
}