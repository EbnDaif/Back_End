const Blog = require('../models/Blogs.model')
const loggerEvent = require("../services/logger.services");
const logger = loggerEvent("blogs");
const fs=require('fs') 
    
exports.Blogctrl = {
  createblog: async (req, res) => {
    try {
      logger.info(req.body);
      const date = new Date().toISOString();

      const blog = await new Blog({ ...req.body, owner: req.user._id, date });

      if (req.file) {
        blog.image = `/api/blogs/${req.file.filename}`;
      }
      await blog.save();

      res.send({ message: "created" });
    } catch (error) {
      res.status(500).send({ message: error.message });
      logger.error(error.message);
    }
  },
  getblog: async (req, res) => {
    try {
      logger.info(req.body);
      const blog = await Blog.find({ owner: req.user._id }).populate("owner");
      res.send(blog);
    } catch (error) {
      res.status(500).send({ message: error.message });
      logger.error(error.message);
    }
  },
  updateblog: async (req, res) => {
    try {

      let blog = await Blog.findById(req.body._id);
      if (req.file) {
        const imagename = blog.image.split("/")[3];
        console.log(imagename);
        fs.unlinkSync(`./uploads/${imagename}`);
        var imagepath = `/api/blogs/${req.file.filename}`;
      }
      await Blog.findByIdAndUpdate(
        req.body._id,
        { ...req.body, image: imagepath },
        { new: true }
      );

      res.send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ message: error.message });
      logger.error(error.message);
    }
  },
  deleteblog: async (req, res) => {
    try {
      logger.info(req.body);
      const { id } = req.params;
      await Blog.findByIdAndDelete(id);
      res.send({ Message: "Deleted" });
    } catch (error) {
      res.status(500).send({ message: error.message });
      logger.error(error.message);
    }
  },
  getallblog: async (req, res) => {
    try {
      logger.info(req.body);
      const blog = await Blog.find({}).populate("owner")
      res.send(blog);
    } catch (error) {
      res.status(500).send({ message: error.message });
      logger.error(error.message);
    }
  },
};