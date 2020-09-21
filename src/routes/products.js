const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController')
const {authJwt} = require('../middlewares/index');


router.route('/')
    .get(productsController.paginate)
    .post(
      [authJwt.verifyToken, authJwt.isAdmin],
      productsController.create
    )


router.route('/:id')
    .post(productsController.crearprod)

router.route('/category/:id')
    .post(productsController.prodCat)

router.route('/:id', isAuthenticated)
    .get(productsController.show)
    .delete(
        [authJwt.verifyToken, authJwt.isAdmin],
        productsController.destroy)
    .put(
        [authJwt.verifyToken, authJwt.isAdmin],
        productsController.update)


module.exports = router;
