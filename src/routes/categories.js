const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/CatController');

router.route('/')
    .post(categoriesController.create)
    .get(categoriesController.list)

router.route('/:id')
    .get(categoriesController.view)
    .delete(categoriesController.del)
    // .put(categoriesController.edit)

router.route('/:id')
    .get(categoriesController.getSubCats);

module.exports = router;
