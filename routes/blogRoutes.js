const express = require('express');
const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllPublishedBlogs);
    
blogRouter.get('/:id', blogController.getAllUserBlogs);

blogRouter.get('/:blogId', blogController.getPublishedBlog);

blogRouter.post('/', blogController.createNewBlog);

blogRouter.patch('/blogId', blogController.updateBlogState)

blogRouter.put('/:blogId', blogController.updateBlog);

blogRouter.delete('/:blogId', blogController.deleteOneBlog);


module.exports = blogRouter;