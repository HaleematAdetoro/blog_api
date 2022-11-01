const { blogModel } = require('../models/blogModel');

const getAllPosts = (req, res) => {
    res.send ("Get all Posts");
};

const getAllPublishedPosts = (req, res) => {
    res.send(" Get all published posts")
}

const createNewPost = (req, res) => {
    res.send("Create a new Post");
};

const updateOnePost = (req, res) => {
  res.send("Update one post")  
};

