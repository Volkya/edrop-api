const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsController = require('../controllers/ProductsController')

router.route('/')
    .get(productsController.paginate)
    .post(productsController.multerMiddleware,productsController.create)


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





router.put('/products/:id', (req, res) => {
    const paEditar = req.params.id;
    const targetElement = req.body;

    Product.findByIdAndUpdate(paEditar, prod)
})


module.exports = router;
