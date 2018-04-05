$(document).ready(function() {
	var id=null;

	function sortProp(mas,prop){
		mas.sort(function(a,b){
			if(a[prop]>b[prop])
				return 1;
				return -1;
		})
	}

	function getUsers(){
		$.get('/allUsers',function(data){
			console.log(data)
			createTable(data,"#mastable");
		})
	}

	function createTable(mas,container){
		$(container).empty();
		$("<table>").addClass("table").appendTo(container);
		$("<tr>").addClass("row_header").appendTo('.table');
		$("<td>").addClass("header").appendTo('.row_header').text('name');
		$("<td>").addClass("header").appendTo('.row_header').text('age');
		$("<td>").addClass("header").appendTo('.row_header').text('salary');

		for (var i = 0; i < mas.length; i++) {
			$("<tr>").addClass("tr").appendTo(".table");
			for(var key in mas[i]){
				$("<td>").addClass("td").appendTo(".tr:last").text(mas[i][key]);
			}
			for (var j = 1; j <= 2; j++) {
				$("<td>").appendTo(".tr:last");
				var btn=$("<button>");
				if (j==1) {
					btn.text("Delete").addClass("Delete").css("background-color","red")
				}
				else{
					btn.text("Update").addClass("Update").css("background-color","green")
				}
				$(".table .td:last").append(btn);
			}
		}
		$('.tr').children().filter(":first-child").hide()
		$('.Delete').click(function() {
			console.log(this)
			var id=$(this).parent().parent().children().filter(":first").text();
			console.log(id);
			var obj={id:id}
			$.post('/deleteUser',obj,function(data){
				console.log(data);
				getUsers()
			})
		})
		$('.Update').click(function(){
			$('#Btn').val('Update')
			var tds=$(this).parent().parent().children();
			console.log(tds);
			var name=$(tds[1]).text();;
			$("#Name").val(name);
			var Age=$(tds[2]).text();
			$("#Age").val(Age);
			var Salary=$(tds[3]).text();
			$("#Salary").val(Salary);
			id=$(tds[0]).text();	
		})
		$(".header").click(function(){ 
			var prop=$(this).text()
			sortProp(mas,prop)
			createTable(mas,'#mastable');
		})	
	}

	getUsers();


	$('#Btn').click(function(){
		var obj={
			name:$('#Name').val(),
			age:$('#Age').val(),
			salary:$('#Salary').val()
		}
		if ($(this).val()=="Update") 
			obj.id=id;
		$.post('/send',obj,function(data){
			console.log(data);
			getUsers();
			})
		$(this).val('Submit')
		$("#Name").val(" ");
		$("#Age").val(" ");
		$("#Salary").val(" ");
	})	
})
