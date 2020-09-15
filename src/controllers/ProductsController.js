const Product = require('../models/Product');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');

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

// function index(req, res) {
//     // Todos los productos
//     Product.find({})
//         .then(docs=>{
//             res.json(docs);
//         }).catch(err => {
//         console.log(err);
//         res.json(err)
//     })
// }

function paginate(req, res) {
    Product.paginate({}, {page: req.query.page || 1, limit: 20, sort: {'_id': -1}})
        .then(docs=>{
            res.json(docs);
        }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

function create(req, res) {
// nuevo producto
    let body = req.body;
    console.log(body);
    const product = new Product({
        title: body.title,
        description: body.description
    });
    product.save((err, productSaved) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear el producto',
                errors: err
                // next(err)
            })
        }
        res.json({
            ok: true,
            mensaje: productSaved
            // next()
        })
    })
    // req.product = productSaved;
}

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

function update(req, res) {
// recurso actualizado
}

function destroy(req, res) {
// eliminar producto
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






// router.put('/products/:id', (req, res)=> {
//   let attributes = ['title', 'description'];
// let productParams = {};
// attributes.forEach(attr=>{
//   if(Object.prototype.hasOwnProperty.call(req.body,attr))
//   productParams = req.body(attr);
// })
//   // Product.findById(req.params.id)
//   // .then(doc => {
//   //   doc.title = req.params.title;
//   //   doc.description = req.params.description;

//   //   doc.save();
//   // })
//   Product.findByIdAndUpdate(req.params.id, productParams, {new: true}
//   // {
//   //   title: req.body['title'],
//   //   description: req.body.description
//   // }
//   ).then(doc => {
//     res.json(doc);
//   }).catch(err => {
//     console.log(err);
//     res.json(err);
//   })
// })

// router.put("/products/:id", (req, res, next) => {
//     let attributes = ['title', 'description'];
// let productParams = {};
//   productParams
//       .findByIdAndUpdate(req.params["id"], req.body, { new: true })
//       .then(doc => {
//         res.json(doc);
//       })
//       .catch(err => {
//         res.status(400);
//         res.json(err);
//       });
// });