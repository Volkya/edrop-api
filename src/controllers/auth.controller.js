const User = require('../models/User');

export const signUp = async (req, res) => {
    res.json('signup');
}


export const signIn = async (req, res) => {
    res.json('signin')
}
