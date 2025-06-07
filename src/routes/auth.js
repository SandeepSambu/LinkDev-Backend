const express = require("express");
const authRouter = express.Router();
const Auth = require("../middlewares/Auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controllers/authController");

authRouter.post("/register", registerUser);
authRouter.put("/updateUser", Auth, updateUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

module.exports = authRouter;
