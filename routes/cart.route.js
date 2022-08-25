const router = require("express").Router();
const {addToCart,viewUserCart,deleteProductInCart,check}= require("../controller/cart.controller")
router.post("/addToCart/:token/:productId",addToCart);
router.get("/check/:productId",check)

router.get("/viewCart/:token",viewUserCart);
router.delete("/removeProduct/:token/:productID",deleteProductInCart);

module.exports = router;
