const {addToCart, removeFromCart, getCart}=require("../controller/cartController");
const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth");


router.post("/addCart",authMiddleware,addToCart);
router.post("/remove",authMiddleware,removeFromCart);
router.post("/getcart",authMiddleware,getCart);

module.exports=router;
