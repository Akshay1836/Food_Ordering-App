const userModel = require("../model/userModel");
const asynchandler = require("express-async-handler");

//add items to cart

const addToCart = asynchandler(async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find user data by userId
    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("YES");

    // Ensure cartData is an object
    let cartData = userData.cartData || {};

    // Update the cartData with the new item
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    console.log(cartData);
    // Update the user's cartData in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//remove items to cart

const removeFromCart = asynchandler(async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData;
    if (cartData[itemId]>0) {
      cartData[itemId] -= 1;
    }
    console.log(cartData);
    await userModel.findByIdAndUpdate(userId,{cartData});
    res.json({success:true,message:"Removed from cart"})
  } catch (error) {
        res.status(500).json({success:false,message:"Internal error occured"})
  }
});

//get all data from cart

const getCart = asynchandler(async (req, res) => {});

module.exports = { addToCart, removeFromCart, getCart };
