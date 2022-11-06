const express = require('express');
const homeController = require('../controllers/homeController');

const homeRouter = express.Router();

homeRouter.get('/', homeController.getAllPublishedBlogs);

homeRouter.get('/:id', homeController.getPublishedBlog);

module.exports = homeRouter;