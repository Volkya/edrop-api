var express = require('express');
var router = express.Router();

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


module.exports = router;
