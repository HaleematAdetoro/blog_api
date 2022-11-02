const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const AuthController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', passport.authenticate('signup', {session: false}), AuthController.signup);

authRouter.post('/login', passport.authenticate('login', { session: false }), AuthController.login);


module.exports = authRouter;
