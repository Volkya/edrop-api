const User = require('../models/User');
const Role = require('../models/Role');

async function createUser(req, res) {

    try {
        
    const {username, email, password, roles} = req.body;

    const rolesFound = await Role.find({name: {$in: roles}})
     
    // creating new suer
    const user = new User({
        username,
        email,
        password,
        roles: rolesFound.map((role)=> role_id),
    });

    // encriptar contraseñas
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
    })
    } catch (error) {
      console.log(error);  
    }

}