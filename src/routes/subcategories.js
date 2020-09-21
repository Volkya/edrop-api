const express = require('express');
const router = express.Router();
const subCategories = require('../controllers/SubcatController');

router.route('/')
    .post(subCategories.create)
    .get(subCategories.list);

// crear subcats para cats y obtener subcats de cats
router.route('/:id')
    .post(subCategories.crearSubCat);


module.exports = router;
