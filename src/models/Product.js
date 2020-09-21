const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Uploader = require('./Uploader');
const slugify = require('../plugins/slugify');
const Schema = mongoose.Schema;

let producSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    marca: String,
    talle: String,
    categoria: String,
    subcategoria: String,
    description: String,
    coverImage: String,
    public_id: String,
    colores: String,
    precioCompra: Number,
    precioVenta: Number,
    proveedor: String,
    updated: {
        type: Number,
        default: Date.now()
    },
    subCat: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    cat: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});



// producSchema.methods.updateCover = function(path. imageType){
//     return Uploader(path)
//     .then(secure_url => this.saveCoverUrl(secure_url, imageType))
// }

//  producSchema.methods.saveCoverUrl = function(secure_url, imageType){
//      this[imageType+'Image'] = secure_url;
//      return this.save();
//  }

// producSchema.pre('save', function(next){
//     this.slug = slugify(this.title);
//     next();
//     })

// producSchema.statics.validateSlugCount = function(slug) {
//     Product.find({})
// }

producSchema.plugin(mongoosePaginate);

let Product = mongoose.model('Product', producSchema);

module.exports = Product;
