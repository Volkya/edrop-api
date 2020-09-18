const mongoose = require('mongoose');

const subcatSchema = new mongoose.Schema({
    name: {
        type: Number,
        required: true
    },
    public_name: {
        type: String
    }
})

const Subcategory = mongoose.model('Subcategory', subcatSchema);

module.exports = Category;
