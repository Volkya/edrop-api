const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsController = require('../controllers/ProductsController')

router.route('/')
    .get(productsController.paginate)
    .post(productsController.create)


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
    .get(productsController.show)
    .delete(productsController.destroy)
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
