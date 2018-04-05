var mongoose=require('mongoose')
mongoose.connect('mongodb://nazarbaran:Thechosenone31@ds145750.mlab.com:45750/mydb');
console.log('mongodb connect');
module.exports=mongoose;