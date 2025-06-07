const express = require("express");
const dashRouter = express.Router();
const Auth = require("../middlewares/Auth");
const {
  allow,
  createProject,
  createBlog,
  deleteProject,
  deleteBlog,
  updateProject,
  updateBlog,
} = require("../controllers/dashboardController");

dashRouter.get("/allow", Auth, allow);

dashRouter.post("/createProject", Auth, createProject);

dashRouter.post("/createBlog", Auth, createBlog);

dashRouter.put("/updateProject/:id", Auth, updateProject);

dashRouter.delete("/deleteProject/:id", Auth, deleteProject);

dashRouter.put("/updateBlog/:id", Auth, updateBlog);

dashRouter.delete("/deleteBlog/:id", Auth, deleteBlog);

module.exports = dashRouter;
