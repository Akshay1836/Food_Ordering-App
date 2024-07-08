const express = require("express");
const asyncHandler = require("express-async-handler");
const food_model = require("../model/foodModel");
const router = express.Router();
const fs = require("fs");

//add item
const addFood = asyncHandler(async (req, res) => {
  let image_filename = req.file.filename;
  const { name, description, price, category } = req.body;
  console.log(name,description,price,category);
  if (!name || !description || !price || !category) {
    return res
      .status(404)
      .json({ success: false, message: "Provide all details" });
  }
  const food = new food_model({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    return res.status(200).json({ success: true, message: "Food added" });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
});

//listing food items

const listFood = asyncHandler(async (req, res) => {
  const list_Items = await food_model.find({});
  if (list_Items) {
    return res.status(200).json({ success: true, message: list_Items });
  } else {
    return res.status(404).json({ success: false, message: "Items not found" });
  }
});

//remove Food item
const removeFood = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const food_item = await food_model.findById(id);
  if (!food_item) {
    return res.status(404).json({ success: false, message: "not found" });
  } else {
    fs.unlink(`uploads/${food_item.image}`, () => {});
    const status = await food_model.findByIdAndDelete(id);
    if (status) {
      return res.status(200).json({ success: true, message: "Deleted" });
    }
  }
});

module.exports = { addFood, listFood, removeFood };
