const users = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 




exports.RegisterUser = async(req,res)=>{
                const {password, email} = req.body;
                req.body.password = await bcrypt.hash(password, 10);
                const email_is_exist = await users.findOne({ email })
                if (email_is_exist) return res.status(401).json({status:false, message: 'User Email Exits', error:'User Email Exits'})
                const data = new users(req.body);
                try {

                        data.save((err, users) => {
                        if (err) return res.status(401).json({status:false, message: '', error: err})
                            res.status(200).json({status:true, message: 'User Register', users:users}) })
                        } 
                catch (error) {

                return res.status(401).json({status:false, message: '', error: error})
                }   
}

exports.LoginUser = async(req,res,next)=>{
            const {email,password} = req.body;
            if(!email|| !password) return res.status(401).json({status:false, message: '',error:'All filed are required' })
            var user = await users.findOne({email:req.body.email});
            if(!user)return res.status(401).json({status:false, message: '',error:'User Email Does Not Exist.... ' })
            const validatedpassword = await bcrypt.compare(req.body.password, user.password);
            if(!validatedpassword)return res.status(401).json({status:false, message: '',error:'User Credential Does not match' })
try {
          
        const token = jwt.sign({_id:user._id }, process.env.SecretKey) ;
       
        res.cookie('token',token, { expires: new Date(new Date().getTime()+5*60*1000), httpOnly: true });
        user.token = token;
        return      res.status(200).json({status:true, message: 'User Login Success', data:user, token:token}) 
         
           
     } catch (error) {
         next(error)
         return   res.status(500).json({error:error}) 
         console.log(error);
         
     }


}


exports.UserlistById = async(req,res)=>{
    var id = req.params.id; 
 
     if(id.length<24){
       return  res.status(404).json({message: 'Product Id Wrong'});

     }
     else{
     var good_id = new ObjectId(id);  
     }
    // if(id.length())
   
    try {
    const product = await users.find({_id: good_id})
    
        if (product) {
            return    res.status(200).json({status:true, message: 'Product List', data:product}) 
        } else {
            return   res.status(404).json({message: 'Product not found'});
        }
        
    } catch (error) {
        return    res.status(404).json({message: error});
    }
  
}

 exports.UserList = async(req,res)=>{
    
   const  data =   await users.find();

    try {
         const{password, ...other} = data;
          req.user = data;
        if(data){
            return   res.status(200).json({status:true, message: 'users', users:other})
        }
    } catch (error) {
        return  res.status(500).json({status:false, message: '',error:error})
    }
    


 }





 exports.update = async (req, res) => {
   
     const userupdate = await users.findByIdAndUpdate(req.params.id,req.body, {new:true});
     
     if(userupdate) {
        
        return res.status(200).send({status: true, message: "User updates", data:userupdate});
   }
return res.status(503).send({status: false, message: "user  not! updates"});}  