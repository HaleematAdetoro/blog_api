const { blogModel } = require('../models/blogModel');

const getAllUsersPosts = (req, res) => {
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

const deleteOnePost = (req, res) => {
    res.send("Delete one post")
}

module.exports = {
    getAllUsersPosts,
    getAllPublishedPosts,
    createNewPost,
    updateOnePost,
    deleteOnePost
}


