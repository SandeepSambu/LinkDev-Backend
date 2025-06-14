const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    validation(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    await user.save();

    res.status(201).send("Account created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;

    const avatarUrl = req.file ? req.file.filename : null;

    const { username, title, bio, location, github, linkedin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        username,
        title,
        bio,
        location,
        github,
        linkedin,
        avatar: avatarUrl ? `/uploads/${avatarUrl}` : user.avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("projects")
      .populate("blogs");

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;

    const user = await User.findOne({
      $or: [{ email: loginEmail }, { username: loginEmail }],
    })
      .populate("projects")
      .populate("blogs");

    if (!user) {
      throw new Error("Invalid Credentials...");
    }

    const decodedPassword = await bcrypt.compare(loginPassword, user.password);

    if (!decodedPassword) {
      throw new Error("Invalid Credentials...");
    }

    const filteredUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      title: user.title,
      location: user.location,
      bio: user.bio,
      github: user.github,
      linkedin: user.linkedin,
      projects: user.projects,
      blogs: user.blogs,
    };

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      message: "Logged in successfully",
      data: filteredUser,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.status(200).send("Loggedout successfully.");
};

module.exports = { registerUser, updateUser, loginUser, logoutUser };
