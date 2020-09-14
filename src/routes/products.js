const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsController = require('../controllers/ProductsController')

router.route('/')
    .get(
        (req, res) => {
            Product.find({})
                .then(docs=>{
                    res.json(docs);
                }).catch(err => {
                console.log(err);
                res.json(err)
            }) // all products function
        })
    .post(
        (req, res)=>{
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
            }) // post product function
        })


// promesas
// crear producto
// router.post('/products', (req, res)=>{
//   Product.create({
//    title: 'Manualmente insercion 3',
//    description: "Manualmente insercion descripcion 3"  
//   }) 
//    .then(doc=>{
//        res.json(doc)
//    }).catch(err=>{
//        console.log(err); 
//        res.json(err)  
//    })
// })




router.route('/:id')
    .get(
        (req, res)=> {
            Product.findById(req.params.id)
                .then(doc => {
                    res.json(doc);
                }).catch(err=> {
                console.log(err);
                res.json(err);
            }) // get one function
        })
    .delete(
        (req, res)=> {
            Product.findByIdAndRemove(req.params.id)
                .then(doc => {
                    res.json(doc)
                }).catch(err=>{
                console.log(err);
                res.json(err);
            }) // delete function
        })
    .put()









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

router.put("/products/:id", (req, res, next) => {
    let attributes = ['title', 'description'];
let productParams = {};
  productParams
      .findByIdAndUpdate(req.params["id"], req.body, { new: true })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(400);
        res.json(err);
      });
});





module.exports = router;
