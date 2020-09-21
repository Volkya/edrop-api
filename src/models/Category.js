const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: Number,
        required: true
    },
    public_name: {
        type: String
    },
    sub_cats: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
});


const category = mongoose.model('Category', categorySchema);

module.exports = category;
