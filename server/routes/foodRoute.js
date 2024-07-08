const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  listFood,
  removeFood,
} = require("../controller/foodController.js");

//image storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

module.exports = router;
