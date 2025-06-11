const express = require("express");
const authRouter = express.Router();
const Auth = require("../middlewares/Auth");
const upload = require("../middlewares/multer");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controllers/authController");

authRouter.post("/register", registerUser);
authRouter.patch("/updateUser", Auth, upload.single("avatar"), updateUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

module.exports = authRouter;
