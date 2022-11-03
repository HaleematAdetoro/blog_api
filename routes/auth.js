const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const AuthController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', passport.authenticate('signup', {session: false}), AuthController.signup);


authRouter.post('/login', async (req, res, next) => passport.authenticate('login', (error, user, info) => {
    AuthController.login(error, req, res, next, user, info)
})(req, res, next))


  


module.exports = authRouter;
