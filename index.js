const express = require('express');
 const app = express();
 require('dotenv').config()
 var expressValidator = require('express-validator');
 app.use(expressValidator())
const port = process.env.PORT|| 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
const connection  = require('./databse/connection');
const userroute = require('./routes/Users');
 /* this is use handle error global */

 /* this is use handle error global */
 app.use('/api',userroute);
 app.use(function(req, res, next) {
  if (!req.route)
      return next (new Error('Page Not Found'));  
  next();
});

app.use(function(err, req, res, next){
   res.status(404).json({error:{ message:err.message}})
  //res.send();
})
  



app.listen(port, ()=>console.log(`server is runing ${port}`))

//console.log(app)