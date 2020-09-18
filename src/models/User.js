const mongoose = require('mongoose')

const bcrypt  = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    seller: {
        type: Boolean,
        default: false
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now()
    }
})

// userSchema.methods.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password.salt);
// }
//
// userSchema.methods.matchPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

module.exports = mongoose.model('User', userSchema);