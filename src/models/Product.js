const mongoose = require('mongoose');

let producSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    coverImage: String
})

let Product = mongoose.model('Product', producSchema);

module.exports = Product;