const Projects = require("../models/projectModel");
const Blogs = require("../models/blogsModel");
const User = require("../models/userModel");

const allow = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    res.status(401).send("Unauthorized access");
  }
};

const createProject = async (req, res) => {
  try {
    const { author, title, desc, tech, git, demo } = req.body.info;
    const project = new Projects({
      author: author,
      title: title,
      desc: desc,
      tech: tech,
      git: git,
      demo: demo,
    });

    await project.save();

    await User.findByIdAndUpdate(author, {
      $push: {
        projects: project._id,
      },
    });

    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createBlog = async (req, res) => {
  try {
    const { author, title, desc, slug } = req.body;

    const newBlog = new Blogs({
      author: author,
      title: title,
      desc: desc,
      slug: slug,
    });

    await newBlog.save();

    await User.findByIdAndUpdate(author, {
      $push: {
        blogs: newBlog._id,
      },
    });

    res.status(200).send(newBlog);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const project = await Projects.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;

    await Projects.findByIdAndDelete(id);

    res.status(200).send("Project deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const blog = await Blogs.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blogs.findByIdAndDelete(id);

    res.status(200).send("Blog deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  allow,
  createProject,
  createBlog,
  updateProject,
  deleteProject,
  updateBlog,
  deleteBlog,
};
