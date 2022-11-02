const express = require('express');
const { createUser } = require('../controllers/userController');

const signupRouter = express.Router();

signupRouter.route('/').post(createUser);

module.exports = signupRouter;