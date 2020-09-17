const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors')
const port = process.env.port || 3200;
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import and run database
const db = require('./config/database');
db.connect();

//import and use routes
app.use(cors());
const users = require('./routes/users');
const products = require('./routes/products');
app.use('/products', products);
app.use('/users', users);

app.listen(port, function() {
    console.log("listo express")
});

module.exports = app;
