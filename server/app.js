const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const foodRoute = require("./routes/foodRoute.js");
const userRouter = require("./routes/userRoutes.js");
const cartRouter=require("./routes/cartRoute.js")
//middleware
const corsOptions = {
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/food", foodRoute);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/images", express.static("uploads"));

module.exports = app;
