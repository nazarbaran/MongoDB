var mongoose=require('./mongoose')
var userSchema=new mongoose.Schema({
	name:{	
		type:String,
		unique:true,
		require:true
	},
	age:{
		type:Number,
		require:true
	},
	salary:{
		type:Number,
		min:3200,
		max:50000
	}
})
var User=mongoose.model("User",userSchema);
module.exports=User;