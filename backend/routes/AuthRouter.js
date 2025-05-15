const router = require('express').Router();

const { signup,login } = require('../controller/authcontroller')
const{ signupvalidation , loginvalidation} = require('../middleware/authmiddleware')
router.post('/signup',signupvalidation,signup)
router.post('/login',loginvalidation,login)

module.exports = router;
