const Product = require('../models/Product');
const cloudinary = require('cloudinary');


// const upload = require('../config/upload');
// const uploader = require('../models/Uploader');

cloudinary.config({
    cloud_name: "dovgaoa5l",
    api_key: "179323816646849",
    api_secret: "fB6wtPvvEcqOjZUMCwgnlvaiiN0",
});
const Image = require('../models/Image');
const fs = require('fs-extra');


async function find(req, res) {
    const product = await Product.findById(req.params.id)
        res.status(200).json(product);
        // .then(product=> {
        //     req.product = product;
        //     next();
        // })
        // .catch(err=>{
        //     next(err);
        // })
}

async function paginate(req, res) {
    // PRODUCTOS POR PAGINA
    await Product.paginate({}, {page: req.query.page || 1, limit: 20, sort: {'_id': -1}})
        .then(docs=>{
            res.json(docs);
        }).catch(err => {
        console.log(err);
        res.json(err)
    })

}


async function create(req, res) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            precioCompra: req.body.precioCompra,
            precioVenta: req.body.precioVenta,
            marca: req.body.marca,
            colores: req.body.colores,
            talle: req.body.talle,
            coverImage: result.url,
            public_id: result.public_id
        });
        console.log(result);
        const productSaved = await product.save();
        await fs.unlink(req.file.path);
        res.status(201).json(productSaved);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}





async function show(req, res) {
    await Product.findById(req.params.id)
        .then(doc => {
            res.json(doc);
        }).catch(err=> {
        console.log(err);
        res.json(err);
    })
}


async function update(req, res) {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(204).json(updatedProduct);
}

async function destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id)
    // res.status(204).json();
        .then(doc => {
            res.json(doc)
        }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}


function multerMiddleware(){
    return upload.fields([
        {name: 'coverProduct', maxCount: 5},
        {name: 'avatar', maxCount: 1}
    ]);
}


function saveImage(req, res){
    if(req.productSaved){
        if(req.files && req.files.cover){
            const path = req.files.cover[0].path;
            uploader(path).then(result=>{
                console.log(product);
                res.json(product)
            }).catch(err=>{
                console.log(err);
                res.json(err);
            })
        }
    }else{
        res.status(422).json({
            error: req.error || 'Could not save product'
        })
    }
}

module.exports = {
    multerMiddleware,
    paginate,
    create,
    destroy,
    show,
    update,
    saveImage
}
