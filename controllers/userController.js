const UserModel = require('../models/userModel');

const createUser = async(req, res) => {
const body = req.body

    const user = await UserModel.findOne({ username: req.user.username })

    if (user) {
        res.json({ message: 'Username already exists choose another'})
    }

    const User = await UserModel.create({
        first_name: body.firstname,
        last_name: body.lastname,
        email: body.email,
        username: body.username,
        password: body.password 
    })
   
    const createdUser = await User.save()

    return res.status(201).json({
        status: true,
        data: createdUser
    })

}


module.exports = createUser;


