const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');


require('dotenv').config();


const signup = async(req, res,) => {
    try{
        return res.status(201).json({
            status: true,
            message: 'Signup successful',
            user: req.user
        }) 
    } catch (error) {
        res.status(500).json({ status: false, data: error})
    }
}    


const login = async (error, req, res, next, user, info) => {
    try{
        if (error) {
            return next(error);
        }
        if (!user) {
            const error = new Error('Username or password incorrect')
            return next(error)
        }
    
        req.login(user, { session: false },
            async (error) => {
                if (error) return res.status(400).json(error)
        
                const body = { _id: user._id, username: user.username};
        
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' })
        
                return res.status(200).json({ message: 'Login succesful', token });
            }
        );
    } catch (error) {
        next(error);
    }

}



module.exports = {
    signup,
    login,
};
