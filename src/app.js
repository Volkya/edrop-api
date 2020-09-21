const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const multer = require('multer');
const methodOverride = require('method-override');
const cors = require('cors');
const port = process.env.port || 3200;
app.set('port', port);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
const uuid = require('uuid/v4');

//  middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));


// sesiones
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUnitialized: true
// }));
// app.use(passport.initialize());
// // app.use(passport.session());
// // app.use(flash());

// flash variables
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.local.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.user = req.user || null;
//     next();
// });

// import and run database
const db = require('./config/database');
db.connect();

//import and use routes
app.use(cors());
const users = require('./routes/users');
const products = require('./routes/products');
const categories = require('./routes/categories');
const subcategories = require('./routes/subcategories');
app.use('/products', products);
app.use('/users', users);
app.use('/categories', categories);
app.use('/subcategories', subcategories);

app.listen(port, function() {
    console.log("listo express")
});

module.exports = app;
