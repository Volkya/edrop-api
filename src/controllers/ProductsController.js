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


function find(req, res, next) {
    Product.findById(req.params.id)
        .then(product=> {
            req.product = product;
            next();
        })
        .catch(err=>{
            next(err);
        })
}

function paginate(req, res) {
    // PRODUCTOS POR PAGINA
    Product.paginate({}, {page: req.query.page || 1, limit: 20, sort: {'_id': -1}})
        .then(docs=>{
            res.json(docs);
        }).catch(err => {
        console.log(err);
        res.json(err)
    })

    // Todos los productos
    // Product.find({})
    //     .then(docs=>{
    //         res.json(docs);
    //     }).catch(err => {
    //     console.log(err);
    //     res.json(err)
    // })

    // Product.find(function (err, products) {
    //     if (err) res.send(500, err.message);
    //
    //     console.log('Get /products')
    //     res.status(200).json(products);
    // })

}

async function create(req, res, next) {
    try{
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
        await product.save();
        await fs.unlink(req.file.path);
    }catch (e) {
        console.log(e);
    }





    // let body = req.body;
    // const product = new Product({
    //     title: body.title,
    //     description: body.description,
    //     marca: body.marca,
    //     talle: body.talle,
    //     categoria: body.categoria,
    //     subcategoria: body.subcategoria,
    //     proveedor: body.proveedor,
    //     precioVenta: body.precioVenta,
    //     precioCompra: body.precioCompra,
    //     colores: body.colores,
    //     updated: body.updated,
    //     // coverImage: result.coverImage,
    //     // public_id: result.public_id
    // });
    // await product.save((err, productSaved) => {
    //     if(err){
    //         return res.status(400).json({
    //             ok: false,
    //             mensaje: 'error al crear el producto',
    //             errors: err
    //             // next(err)
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         mensaje: productSaved
    //         // next()
    //     })
    // })
} //end create




function show(req, res) {
// busqueda individual
    Product.findById(req.params.id)
        .then(doc => {
            res.json(doc);
        }).catch(err=> {
        console.log(err);
        res.json(err);
    })
}


async function update(req, res) {
    const {title, description} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {title, description});

}

async function destroy(req, res) {
    Product.findByIdAndRemove(req.params.id)
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
    saveImage
};
