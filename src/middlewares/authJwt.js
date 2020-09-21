const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const User = require('../models/User');
const Role = require('../models/Role');

const verifyToken = async function(req, res, next) {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).json({
        message: "No token proveniente"
    })

    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.indexOf;

        const user = await User.findById(req, userId, {password: 0});
        if (!user) 
            return res.status(404).json({message: "User no encontrado"})
        
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'No autorizado'});
    }
};

const isModerator = async function(req, res, next) {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({_id: {$in: user.roles}})

        for (let index = 0; index < roles.length; index++) {
            if (roles[index].name === "moderator") {
                next();
                return;
            }
        }
        return res.status(403).json({message: "Require moderator role!"});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

const isAdmin = async function(req, res, next) {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({_id: {$in: user.roles}})

        for (let index = 0; index < roles.length; index++) {
            if (roles[index].name === "admin") {
                next();
                return;
            }
        }
        return res.status(403).json({message: "Require moderator role!"});
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

module.exports.isAdmin = isAdmin;
module.exports.isModerator = isModerator;
module.exports.verifyToken = verifyToken;