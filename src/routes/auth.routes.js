const Router = require('express')
const router = Router();

const authCtrl  = require('../controllers/AuthController');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)


module.exports = router;
