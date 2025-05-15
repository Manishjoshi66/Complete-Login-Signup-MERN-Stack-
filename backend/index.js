const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter')
const productrouter = require('./routes/productrouter')
require('./models/db.js');
const PORT = process.env.PORT || 8080
app.use(bodyparser.json());
app.use(cors());



app.get('/',(req,res)=>{
    res.send("welcome user");
})
app.use('/auth',AuthRouter);
app.use('/product',productrouter);


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
