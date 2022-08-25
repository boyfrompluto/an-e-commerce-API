const router = require("express").Router();
const {orderProduct,cancelOrder,viewAllOrders}= require("../controller/order.controller")


router.post("/oderProduct/:token/:cartId",orderProduct);
router.delete("/cancelOrder/:token/:orderId",cancelOrder);
router.get("/viewOrder/:token",viewAllOrders);




module.exports= router;