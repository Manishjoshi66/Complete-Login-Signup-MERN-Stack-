const router = require('express').Router();

const { signup,login,getAllUsers } = require('../controller/authcontroller')
const{ signupvalidation , loginvalidation} = require('../middleware/authmiddleware')
router.post('/signup',signupvalidation,signup)
router.post('/login',loginvalidation,login)
router.get('/getall',getAllUsers)

module.exports = router;
