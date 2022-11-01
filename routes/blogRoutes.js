const express = require('express');
const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllPublishedPosts);
    
blogRouter.get('/:userId', blogController.getAllUsersPosts);

blogRouter.post("/post", blogController.createNewPost);

blogRouter.patch("/:blogId", blogController.updateOnePost);

blogRouter.delete("/:blogId", blogController.deleteOnePost);


module.exports = blogRouter;