const User = require('../models/User');
const {ROLES} = require('../models/Role');  

const checkDuplicateUsernameOrEmail = async function(req, res, next) {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user) 
            return res.status(400).json({message: 'The user already exists'})
            const email =  await User.findOne({email: req.body.email});    
        if (email)
            return res.status(400).json({message: "The email already exists"})
            next();
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}


const checkRolesExisted = function(req, res, next){
    if (req.body.roles) {
        for (let index = 0; index < req.body.roles.length; index++) {
            if (!ROLES.includes(req.body.roles[index])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[index]} does not exist`,
                })
            }
        }
    }
    next();
}

module.exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
module.exports.checkRolesExisted = checkRolesExisted;