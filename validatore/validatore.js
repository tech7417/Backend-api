 exports.validator = (req,res,next)=>{
     req.check('username', 'username Are required').notEmpty();
     req.check('email', 'Email Are required').notEmpty().normalizeEmail().isEmail(),
     req.check( "password", "Please enter a password at least 8 character ").isLength({ min: 8 })
       const error = req.validationErrors();
    if(error){
    const firsterror = error.map(error=>error.msg)
    return res.status(400).json({error: firsterror});
    }


next();



}
