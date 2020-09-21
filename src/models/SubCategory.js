const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: Number,
        required: true
    },
    public_name: {
        type: String
    },
    cat: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});


const subCat = mongoose.model('SubCategory', subCategorySchema);

module.exports = subCat;
