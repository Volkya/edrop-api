const Product = require('../models/Product');

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
            })
        }
        res.json({
            ok: true,
            mensaje: productSaved
        })
    })
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


module.exports = {
    paginate,
    create,
    destroy,
    show
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


