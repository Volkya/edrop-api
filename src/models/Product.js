const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let producSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    coverImage: String
})

producSchema.plugin(mongoosePaginate);

let Product = mongoose.model('Product', producSchema);

module.exports = Product;
