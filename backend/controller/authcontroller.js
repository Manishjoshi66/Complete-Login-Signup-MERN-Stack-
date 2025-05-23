const usermodel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup  = async(req,res)=>{
   try{
    const {name ,email, password} = req.body;
    const user = await usermodel.findOne({email});
    if(user){
       return res.status(409).json({
        message: "user is already exists, you can login",success :false
       })

    }
    const Usermodel  = new usermodel({name,email,password});
   //  const salt = await.bcrypt.getSalt(10);
    Usermodel.password = await bcrypt.hash(password,10);
    await Usermodel.save();
    res.status(201).json({message : 'signup successfully',success:true,
      password : Usermodel.password
    })

   }
   catch(err){
    res.status(500).json({message : 'internal server error ',success:false})
   }
}
const login  = async(req,res)=>{
   try{
    const {email, password} = req.body;
    const user = await usermodel.findOne({email});
    if(!user){
       return res.status(403).json({
        message: "email or password is wrong ",success :false
       })

    }
    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword){
        return res.status(403).json({
        message: "email or password is wrong ",success :false
    })
}
    const jwtToken = jwt.sign({email:user.email,_id : user._id},process.env.JWT_SECRET,{expiresIn : '24'})



    res.status(201).json({message : 'login successfully',success:true,
        jwtToken ,
        email,
        name : user.name
    })

   }
   catch(err){
    res.status(500).json({message : 'internal server error ',succecss:false})
   }
}
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await usermodel.find({}, '-password'); // exclude passwords
//     res.status(200).json({ 
//       success: true,
//       message: "Users fetched successfully",
//       users 
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       success: false,
//       message: "Internal server error" 
//     });
//   }
// };
const getAllUsers = async (req, res) => {
  try {
    const users = await usermodel.find({});

    const usersWithTokens = users.map(user => {
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      };
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: usersWithTokens
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



module.exports = {signup,login,getAllUsers} 