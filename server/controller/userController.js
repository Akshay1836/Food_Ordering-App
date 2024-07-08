const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const asyncwrapper = require("express-async-handler");

//login user
const loginUser = asyncwrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "resources not found" });
  }
  console.log(email,password)
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const hashcompare = await bcrypt.compare(password, user.password);
  
  if (!hashcompare) {
    return res
      .status(500)
      .json({ success: false, message: "incorrect credentials" });
  }
  const token = createjsontoken(user._id);
  return res
    .status(200)
    .json({ success: true, message: "Login successfull", token });
});

//signup user

const signupUser = asyncwrapper(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "resources not found" });
  }
  const user = userModel.find({ email });
  if (user.email) {
    return res.status(401).json({ success: false, message: "user exists" });
  }
  //validating email
  if (!validator.isEmail(email)) {
    return res
      .status(401)
      .json({ success: false, message: "Enter a valid email" });
  }
  if (password.length < 8) {
    return res
      .status(401)
      .json({ success: false, message: "Enter a valid password" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  const newdata = await newUser.save();
  const token = createjsontoken(newdata._id);
  res.status(200).json({
    success: true,
    token,
    message: "user created,user:",
    newdata,
  });
});

const createjsontoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { loginUser, signupUser };
