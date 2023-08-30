const express = require("express");
const userRoute = express.Router();

const {
  viewUserDetails,
  updateUserAvatar,
  // updateUserDetails,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authProtect");

userRoute.get("/viewUserDetails", protect, viewUserDetails);
userRoute.put("/updateUserAvatar", protect, updateUserAvatar);
// update password
// userRoute.put("/updateUserDetails", protect, updateUserDetails);

module.exports = userRoute;
