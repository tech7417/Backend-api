const config = require('mongoose');
const conection = async()=>{

    const dbconfig = {useNewUrlParser:true, useUnifiedTopology:true}
    try{

         await config.connect(process.env.CONNECTIONURL,dbconfig);
         console.log(`database conencted on  ${process.pid}`);
    }
    catch(error){
        console.log(`database Not conected   ${error}`);
        return false;
    }
}

module.exports = conection();
