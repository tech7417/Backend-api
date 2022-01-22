const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
username:{type:String, require:true, trim:true},
email:{type:String, require:true, trim:true, unique:true},
password:{type:String},
about:{type:String},
role:{type:Boolean, default:false},
history:{type:Array, default:[]},
}, {timestamps:true}
);


module.exports = mongoose.model('Users', userschema, 'Users')