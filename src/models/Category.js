const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: Number,
        required: true
    },
    public_name: {
        type: String
    }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
