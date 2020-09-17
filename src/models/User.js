const mongoose = require('mongoose')
const cifrado = require('mongoose-bcrypt')

const adminSchema = new mongoose.Schema({
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
    password: {
        type: String
    }
})

adminSchema.plugin(cifrado);

module.exports = mongoose.model('Admin', adminSchema);
