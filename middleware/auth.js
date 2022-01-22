
const jwt = require('jsonwebtoken');
const users = require('../model/User');
const { use } = require('../routes/Users');
exports.Authentication = (req,res,next)=>{
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({error: {message:'A token is required for Access Data'}});
  }
 

  try {
    jwt.verify(token,process.env.SecretKey, (err,user)=>{
        if(err){
            return res.status(401).json({error: {message:'Invalid Token'}});
        }
     req.user = user;
    
       // next();
    });
   // const decoded = jwt.verify(token,process.env.SecretKey);
   // req.user = decoded;

     // console.log(decoded);
  } catch (err) {
    return res.status(401).json({error: {message:'Invalid Token'}});
  }
  return next();

  
}


exports.TokenAuthorization = async(req,res,next)=>{
  const user_id = req.user._id;

   try {
    users.findOne({_id: user_id}).then(function(user){
  
    if(user.role==false){
        return res.status(401).json({error: {message:'Admin Can Get Data'}});
    
    }

   
    });
       
   } catch (error) {
    return res.status(401).json({error: error});
       
   }

   

  return  next();

}