const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product= require("../models/product.model");
const Cart = require("../models/cart.model");
const config = require("../config/config");
const Order = require("../models/order.model");


const orderProduct=async(req,res)=>{
    const accessToken = req.params.token;
    const cartId = req.params.cartId;
    const decode = jwt.verify(accessToken, config.access);
    if (!decode) return res.send("access denied");
    const user= await User.findById({_id:decode._id})
    if(!user||user.verified==false) return res.send("access denied")
    const cart = await Cart.findById({_id:cartId})
    
   
    if(!cart) return res.send("cant find your cart")
    const product= cart.productID
    const inOrder= await Order.findOne({cartId:cartId})
    if(inOrder) return res.send("product has already been ordered")
    else{
        const userId= user._id;
        const amount=cart.totalPrice;
        const address=req.body.address;
        const contact= req.body.contact;

        const order= new Order({
            userId:userId,
            cartId:cartId,
            amount:amount,
            address:address,
            contact:contact,
        });
        console.log("hello")
        const savedOrder= order.save();
        const findProduct= await Product.findById({_id:product});
        if(!findProduct) return res.status(500).json("product out of stock")
        else{
           await findProduct.updateOne({$push:{buyers:user._id}})
        }
        
        res.send(savedOrder)
    }
};
const cancelOrder=async(req,res)=>{
    const accessToken = req.params.token;
    const orderId = req.params.orderId;
    const decode = jwt.verify(accessToken, config.access);
    if (!decode) return res.send("access denied");
    const user= await User.findById({_id:decode._id})
    if(!user||user.verified==false) return res.send("access denied")
    const inOrder= await Order.findOne({_id:orderId})
    if(!inOrder) return res.send("access denied")
    Order.findOneAndDelete({_id:orderId},(err,del)=>{
        if(err) return res.send("unable to delete order, contact admin")
        if(del) return res.send("order has been deleted")
    });


};
const viewAllOrders=async(req,res)=>{
    const accessToken = req.params.token;
    const decode = jwt.verify(accessToken, config.access);
    if (!decode) return res.send("access denied");
    const user= await User.findById({_id:decode._id})
    if(!user) return res.send("access denied");
    if(user.verified=true||user.isAdmin==true){

        const allUserOrders= await Order.find({useId:user._id})
        res.send(allUserOrders)
    }

}

module.exports={orderProduct,cancelOrder,viewAllOrders}