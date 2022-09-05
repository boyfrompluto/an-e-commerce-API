const router = require("express").Router();
const express = require("express");
const multer = require("multer");
const path= require("path");
const productStorage = multer.diskStorage({
    destination: 'productUploads',
    filename: (req, file, cb) => {
      cb(null, Date.now()+path.extname(file.originalname));
    }
  });
  const uploads = multer({
    storage: productStorage
  }).array("images",3);
const{
  unverifiedUser,
  product
}= require("../utils/functions")
const {
    viewDetails,
    createProduct,
    editProduct,
    editProductPicture,
    viewAllProducts,deleteProduct
} = require("../controller/product.controller");
const app = express();
app.use(express.json());

router.post("/test1", (req, res) => {
    res.send("hello");
});

router.post("/createProduct/:token", uploads, createProduct);
router.get("/viewAllProducts/:token",viewAllProducts);
router.get("/viewDetails/:token/:productId", viewDetails);
router.post("/editProduct/:token/:productId", uploads, editProduct);
router.post("/editProductPicture/:token/:productId",uploads,editProductPicture);
router.delete("/deleteProduct/:token/:productId",deleteProduct);
router.get('/',unverifiedUser)

module.exports = router;
