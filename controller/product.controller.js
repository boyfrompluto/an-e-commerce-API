const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../config/config");
const Product= require("../models/product.model");
const {productValidation} = require("../middleware/validation")

const viewDetails=async (req,res)=>{
    const accessToken = req.params.token;
    const productId = req.params.productId;
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    else{
        const user= await User.findOne({_id:decode._id})
        if(!user) return res.status(400).send("ACCESS DENIED")
        else{
            if(user.verified==false) return res.status(401).send("PLEASE VERIFY YOUR ACCOUNT")
            else{
                const product = await Product.findById({_id:productId});
                if(!product) return res.status(400).send("product not found")
                else{
                    console.log(product.vendor.userId)
                    console.log(user._id);
                    if(product.vendor.userId=!user._id) return res.send("access denied")
                    else{ res.send(product)}
                }
            }
        }
    }
};
const viewAllProducts=async(req,res)=>{
    const accessToken = req.params.token;
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    const user= await User.findOne({_id:decode._id})
    if(user){
        const products = await Product.find().sort({createdAt:-1})
        res.send(products)
    }
    else return res.send("access denied")

};
const createProduct=async (req,res)=>{
    const productName=req.body.productName;
    const productPrice=req.body.productPrice;
    const description= req.body.description;
    const categories= req.body.categories
    const images = req.files;
    const accessToken= req.params.token;
    const {error}= productValidation(req.body);
    if(error) return res.send(error);
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    else{
        const user = await User.findById({_id:decode._id});
        if(!user) return res.status(400).send("ACCESS DENIED")
        else{
            if(user.verified==false) return res.status(401).send("PLEASE VERIFY YOUR ACCOUNT");
            else{
                if(productName=="") return res.send("PRODUCT NAME IS REQUIRED");
                if(productPrice=="") return res.send("PRODUCT PRICE IS REQUIRED");
                if(description=="") return res.send("PRODUCT DESCRIPTION IS REQUIRED");
                if(images=="") return res.send("PRODUCT IMAGE IS REQUIRED");
                if(categories=="") return res.send("PRODUCT CATEGORIES IS REQUIRED");

                const productExist= await Product.findOne({productName:productName});
                if(productExist) return res.status(400).send("product name unavailable")

                else{
                    
                    const vendor={
                       userId: user._id,
                       userEmail:user.email
                    }
                    const product= new Product({
                        productName: productName,
                        productPrice:productPrice,
                        description:description,
                        images:images,
                        categories:categories,
                        size:req.body.size,
                        color:req.body.color,
                        vendor:vendor
                    });
                    
                    async function main() {
                        let testAccount = await nodemailer.createTestAccount();
            
                        let transporter = nodemailer.createTransport({
                          host: "smtp.ethereal.email",
                          port: 587,
                          secure: false,
                          auth: {
                            user: testAccount.user,
                            pass: testAccount.pass,
                          },
                        });
            
                        let info = await transporter.sendMail({
                          from: "test@example.com",
                          to: user.email,
                          subject: "verify account",
                          text: `user ${user._id} you just created a new product, ${productName}, if this was not you please place a complaint `
                        });
                        res
                          .status(200)
                          .send("product created successfully" );
                        console.log("Message sent: %s", info.messageId);
            
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                      }
            
                      main().catch(console.error);
                      const savedProduct= await product.save();
                     
                }
            
            }
        }
    }
};
const editProduct=async(req,res)=>{
    const productName=req.body.productName;
    const productPrice=req.body.productPrice;
    const description= req.body.description;
    const categories= req.body.categories
    const size = req.body.size;
    const color=req.body.color
    const accessToken= req.params.token;
    const productId = req.params.productId;
    const {error}= productValidation(req.body);
    
    if(error) return res.send(error);
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    else{
        const user = await User.findById({_id:decode._id});
        if(!user) return res.status(400).send("ACCESS DENIED")
        else{
            if(user.verified==false) return res.status(401).send("PLEASE VERIFY YOUR ACCOUNT");
            else{
                const product= await Product.findById({_id:productId});
                if(!product) return res.send("unable to find product")
                
                else{
                    if(product.vendor.userId=!user._id) return res.send("access denied")
                    if(productName=="") return productName=product.productName;
                    if(productPrice=="") return productPrice= product.productPrice;
                    if(description=="") return description=product.description;
                    if(categories=="") return categories= product.categories;
                    if(size=="") return size=product.size;
                    if(color=="") return color=product.color;

                    const updateProduct= await Product.findOneAndUpdate({_id:productId},{
                        productName:productName,
                        productPrice:productPrice,
                        description:description,
                        categories:categories,
                        size:size,
                        color:color
                    });
                    if(!updateProduct) return res.send("unable to update product")
                    else{
                        const productDetails = _.omit(updateProduct.toJSON(),["images","__v"])
                        console.log(productDetails)
                        res.send(productDetails)
    
                    }
                    }

            }

        }
    }
};
const editProductPicture=async(req,res)=>{
    const accessToken= req.params.token;
    const productId = req.params.productId;
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    else{
        const user = await User.findById({_id:decode._id});
        if(!user) return res.status(400).send("ACCESS DENIED")
        else{
            if(user.verified==false) return res.status(401).send("PLEASE VERIFY YOUR ACCOUNT");
            else{
                const product= await Product.findById({_id:productId});
                if(!product) return res.send("unable to find product")
                else{
                    if(product.vendor.userId=!user._id) return res.send("access denied")
                    images=req.files
                    const editProductPicture= await Product.findOneAndUpdate({_id:productId},{images:images})
                    if(!editProductPicture) return res.send("UNABLE TO CHANGE PRODUCT IMAGES")
                    else return res.send("images updated")
                }
            }
        }
    }
};
const deleteProduct=async(req,res)=>{
    const accessToken= req.params.token;
    const productId = req.params.productId;
    const decode =jwt.verify(accessToken, config.access);
    if (!decode) return res.status(400).send("ACCESS DENIED")
    const user= await User.findById({_id:decode._id});
    if(!user||user.verified==false) return res.send("access denied")
    const productExist= await Product.findById({_id:productId})
    if(!productExist) return res.send("product does not exist")
    else{
      console.log(productExist.vendor.userId);
      console.log(user._id)
      if(productExist.vendor.userId=user._id||user.isAdmin==true){
        console.log("hello");
        const deleteProduct= await Product.findOneAndDelete({_id:productId})
        if(!deleteProduct) res.send("unable to delete")
        else return res.send("product has been deleted")
      }else{
        res.send("error")
      }
    }
};
module.exports = {viewDetails,createProduct,editProduct,editProductPicture,viewAllProducts,deleteProduct};
