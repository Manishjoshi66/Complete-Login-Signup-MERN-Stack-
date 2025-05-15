const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_URL ;
require('dotenv').config();

mongoose.connect(mongo_url)
.then(()=>{
    console.log('mogodb connected...');
})
.catch((err)=>{
    console.log('mogodb connection Error :', err);
})