const router = require('express').Router();
const ensureauthenticated = require('../middleware/auth')

router.get('/',ensureauthenticated,(req,res)=>{
    console.log('----logged in user details ->',req.user)
    res.status(200).json([
        {
        name : "mobile",
        price : 1000
    },
        {
        name : "tv",
        price : 10000
    },
]

)
})

module.exports = router;
