var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

const products = [
  {
    "name": "televisor",
    "marca": "samsung",
    "stock": "si"
  },
  {
    "name": "televisor",
    "marca": "samsung",
    "stock": "si"
  },
  {
    "name": "notebook",
    "marca": "xiaomi",
    "stock": "si"
  },
  {
    "name": "consola",
    "marca": "playstation",
    "stock": "si"
  }
];


/* GET home page. */
router.get('/', (req, res) => {
  res.json(products)
});

router.post('/', (req, res) => {
  res.json({
    'metodo': 'post'
  })
});




// promesas
router.post('/products', (req, res)=>{
  Product.create({
   title: res.body.title,
   description: req.body.description  
  }) 
   .then(doc=>{
       res.json(doc)
   }).catch(err=>{
       console.log(err); 
       res.json(err)  
   })
})


module.exports = router;
