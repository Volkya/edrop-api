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
// crear producto
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

// buscar productos
router.get('/products', (req, res) => {
  Product.find({})
    .then(docs=>{
      res.json(docs);
    }).catch(err => {
      console.log(err);
      res.json(err)
    })
})



let attributes = ['title', 'description']
let productParams = {}

attributes.forEach(attr=>{
  if(Object.prototype.hasOwnProperty.call(req.body,attr))
  productParams = req.body(attr);
})


// buscar producto por
router.get('/products/:id', (req, res)=> {
  Product.findById(req.params.id)
    .then(doc => {
        res.json(doc);
    }).catch(err=> {
        console.log(err);
        res.json(err);
    })
})

router.put('/products/:id', (req, res)=> {
  // Product.findById(req.params.id)
  // .then(doc => {
  //   doc.title = req.params.title;
  //   doc.description = req.params.description;

  //   doc.save();
  // })
  Product.findByIdAndUpdate({'_id': req.params.id}, productParams
  // {
  //   title: req.body['title'],
  //   description: req.body.description
  // }
  ).then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log(err);
    res.json(err);
  })
})

module.exports = router;
