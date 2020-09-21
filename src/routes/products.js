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


router.route('/:id')
    .post(productsController.crearprod)

router.route('/category/:id')
    .post(productsController.prodCat)

router.route('/:id', isAuthenticated)
    .get(productsController.show)
    .delete(productsController.destroy)
    .put(productsController.update)





module.exports = router;
