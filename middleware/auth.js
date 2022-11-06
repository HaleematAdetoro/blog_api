const passport = require('passport');
const localStrategy = require('passport-local');
const UserModel = require('../models/userModel')
require('dotenv').config();

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
    new JWTstrategy(
        {
            secret_token: process.env.JWT_Secret,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            
        },
        async (token, done) => {
            try{
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
)


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const { first_name, last_name, username } = req.body
                const user = await UserModel.create({ first_name, last_name, username, email, password })
                
                return done(null, user, { message: 'User created successfully'});
            } catch (error) {
                done(error);
            }
        } 
    )
)


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try{
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Invalid Password '});
                }

                return done(null, user, { message: 'Logged in successfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
)