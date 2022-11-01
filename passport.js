const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config()

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || 'something_secret',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
        
    )
)


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.create({ username, password });
                return done(null, user, { message: 'User created successfully'})
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
)



passport.use (
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: password,
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try{
                const user = await UserModel.findOne({ username });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong password' });
                }

                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                return done(error)
            }
        }
    )
)