const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  Title: {
    type: String,
    trim: true,
    required: true
    },
  date: {
    type: String,
    trim: true,
    required: true
    },
  image: {
    type: String,
    trim: true,
    required: true
    },
  content: {
    type: String,
    trim: true,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId
    , ref: 'User',
    required:true
  }

});


const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
