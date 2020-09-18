const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsController = require('../controllers/ProductsController')
const {isAuthenticated} = require('../controllers/helpers')



router.route('/')
    .get(productsController.paginate)
    .post(
    //   productsController.multerMiddleware(),
      productsController.create
    //   productsController.saveImage
    )


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




router.route('/:id', isAuthenticated)
    .get(productsController.show)
    .delete(productsController.destroy)
    .put()





module.exports = router;
