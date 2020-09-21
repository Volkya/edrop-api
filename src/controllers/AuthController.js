const User = require('../models/User');
const Role = require('../models/Role');

const jwt = require('jsonwebtoken');
const config = require('../config')

export const signUp = async (req, res) => {
    try {
        // getting the request body
        const {username, email, password, roles} = req.body;
        // creating a new user object
        const newUser = new User({
            username, 
            email,
            password: await User.encryptPassword(password),
        })
        // checking for roles
        if(req.body.roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map((role)=> role._id);
        }else{
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }


        // saving the user object in mongo
        const savedUser = await newUser.save();

        // create a token
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400, // 24 hours
        })
        
        return res.status(200).json({token})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const signIn = async (req, res) => {
    try {
        // request body email can be an email or username
        const userFound = await User.findOne({email: req.body.email}).populate(
            "roles"
        );

        if(!userFound) return res.status(400).json({message: 'User not found'});
        const matchPassword = await User.comparePassword(
            res.body.password,
            userFound.password
        );

        if(!matchPassword)
            return res.status(401).json({
                token: null,
                message: 'Invalid password',
            })

        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.json({token})

    } catch (error) {
        console.log(error);
    }
}
