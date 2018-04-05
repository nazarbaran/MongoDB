var fs=require('fs');
var express=require('express');
var app=express();
app.use(express.static(__dirname));

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var User=require("./user")

app.get('/',function(req,res){
	res.sendFile(__dirname+'/main.html');
});

app.post('/send',function(req,res){
	console.log(req.body);
	if (req.body.id) {
		User.update({_id:req.body.id},
		{$set:{
				name:req.body.name,
				age:req.body.age,
				salary:req.body.salary
			}},function(err,result){
				res.send("Updated")
			})
	}
	else{
	var user1=new User(req.body);
	user1.save(function(err,result){
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	})
	}
})

app.post('/deleteUser',function(req,res){
	var id=req.body.id;
	User.remove({_id:id},function(err,result){
		console.log(result)
		res.send("User deleted")
	})
})

app.get('/allUsers',function(req,res){
	User.find(function(err,result){
		console.log(result)
		res.send(result)
	})
})

app.listen(process.env.PORT||8080);
console.log('Server running');