const Router = require('express')
const router = Router();

const Ctrl  = require('../controllers/auth.controller');

router.post('/signup', Ctrl.signUp)
router.post('/signin', Ctrl.signIn)


module.exports = router;
