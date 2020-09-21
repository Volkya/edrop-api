const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt  = require('bcryptjs');

const userSchema = new Schema({
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
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    // date: {
    //     type: Date,
    //     default: Date.now()
    // }
}, {
    timestamps: true,
    versionKey: false
})

 userSchema.methods.encryptPassword = async function (password) {
     const salt = await bcrypt.genSalt(10);
     return await bcrypt.hash(password.salt);
 }

 userSchema.methods.comparePassword = async function (password, receivedPassword) {
     return await bcrypt.compare(password, receivedPassword);
 }

module.exports = mongoose.model('User', userSchema);
