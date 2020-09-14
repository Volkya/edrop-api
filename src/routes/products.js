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

router.post('/products', (req, res)=>{
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

router.put("/:id", (req, res, next) => {
  //   let attributes = ['title', 'description'];
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

router.delete('/products/:id', (req, res)=> {
  Product.findByIdAndRemove(req.params.id)
      .then(doc => {
        res.json(doc)
      }).catch(err=>{
        console.log(err);
        res.json(err);
  })
});



module.exports = router;
