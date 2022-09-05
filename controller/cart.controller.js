const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const config = require("../config/config");

const addToCart = async (req, res) => {
  const accessToken = req.params.token;
  const productId = req.params.productId;
  const decode = jwt.verify(accessToken, config.access);
  if (!decode) return res.send("access denied");
  else {
    const user = await User.findById({ _id: decode._id });
    if (!user) res.send("access denied... please register");
    else {
      const productExist = await Product.findOne({ _id: productId });
      if (!productExist) return res.send("product unavailable");
      else {
        Cart.find({ userId: user._id, productID: productId }, (error, data) => {
          if (!data || data == "") {
            const quantity = req.body.quantity;

            const cart = new Cart({
              userId: user._id,
              productID: productId,
              quantity: quantity,
              
            });
            const savedCart = cart.save();
            res.send(savedCart);
          } else return res.send("product is already in cart");
        });
      }
    }
  }
};
const viewUserCart = async (req, res) => {
  const accessToken = req.params.token;
  const decode = jwt.verify(accessToken, config.access);
  if (!decode) return res.send("access denied");
  else {
    const user = await User.findOne({ _id: decode._id });
    if (!user) res.status(401).send("ACCESS DENIED");
    else {
      const cart = await Cart.find({ userId: user._id });
      if (!cart) return res.send("your cart is empty...buy something");
      else return res.send(cart);
    }
  }
};
const deleteProductInCart = async (req, res) => {
  const accessToken = req.params.token;
  const cartId = req.params.cartId;
  const decode = jwt.verify(accessToken, config.access);
  if (!decode) return res.send("access denied");
  else {
    const user = await User.findOne({ _id: decode._id });
    if (!user) return res.send("access denied");
    else {
      const delProduct = await Cart.findOneAndDelete({ _id: cartId });
      if (!delProduct) return res.send("unable to delete product");
      else return res.send("product deleted");
    }
  }
};
const check= async(req,res)=>{
  const productId=req.params.productId
  await Cart.count({productID:productId},(error,data)=>{
    if(error) return res.send(error)
    else res.send(data)
  })
}

module.exports = { check,addToCart, viewUserCart, deleteProductInCart };
