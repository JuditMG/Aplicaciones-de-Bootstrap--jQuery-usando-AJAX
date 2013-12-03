var API_BASE_URL = "http://localhost:8080/beeter-api";
 
var user = $('#username').val();
var pass = $('#password').val();
var stingid = $('#stingid').val();


$("#get").click(function(e){
	e.preventDefault();
	var user = $('#username').val();
	var pass = $('#password').val();
	var stingid = $('#stingid').val();


	getSting(user, pass, stingid);
});

$("#put").click(function(e){
	e.preventDefault();
	var user = $('#username').val();
	var pass = $('#password').val();
	var stingid = $('#stingid').val();
	var subject = $('#subject').val();
	var content = $('#content').val();

	var sting ='{ "content": "' + content + '", "subject": "' + subject + '", "username": "' + user +'" }';

	put(sting,stingid,pass,user);
});

$("#getstings").click(function(e){
	e.preventDefault();
	var user = $('#username').val();
	var pass = $('#password').val();

	getStings(user,pass);
});
 

$("#delete").click(function(e){
	e.preventDefault();
	var user = $('#username').val();
	var pass = $('#password').val();
	var stingid = $('#stingid').val();
	deleteSting(user, pass, stingid);
});
 
$("#post").click(function(e){
	e.preventDefault();
	var user = $('#username').val();
	var pass = $('#password').val();
	var subject = $('#subject').val();
	var content = $('#content').val();
	
	var sting ='{ "content": "' + content + '", "subject": "' + subject + '", "username": "' + user +'" }';
	var myobject = JSON.parse(sting);
	console.log(sting);
	console.log(myobject);
	createSting(sting,user,pass);
});
 
 
function getSting(user, pass, stingid) {
	var url = API_BASE_URL + '/stings/'+stingid;


	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType: 'json',
		username : user,
		password : pass,
		
	})
	.done(function (data, status, jqxhr) {
		var sting = $.parseJSON(jqxhr.responseText);
		var string = JSON.stringify(sting, null, 4);
		console.log(sting);
		
		
        $("#form3").text(string.split('"').join(' '));
     


		
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
     
	});
 
}
 
function deleteSting(user, pass, stingid) {
	var url = API_BASE_URL + '/stings/'+stingid;
 
	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType: 'json',
		username : user,
		password : pass,
	})
    .done(function (data, status, jqxhr) {
		console.log(status);
	  	$("#form3").text("Borrado correcto");
		
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
		
}
 
 
function createSting(sting,user,pass) {
	var url = API_BASE_URL + '/stings';
	 
	$.ajax({
		url : url,
		dataType: 'json',
		type : 'POST',
		crossDomain : true,
		data : sting,
		username : user,
		password : pass,
		headers : {
			"Accept" : "application/vnd.beeter.api.sting+json",
			"Content-Type"	: "application/vnd.beeter.api.sting+json", 
		},
	})
	.done(function (data, status, jqxhr) {
		console.log(status);
		console.log(data);
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
}

function getStings(user,pass) {
	var url = API_BASE_URL + '/stings?username=alicia&offset=0&length=5';
	console.log("prova2");
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType: 'json',
		username : user,
		password : pass,
		offset : '0',
		legth : '5',
		headers : {
				"Accept" : "application/vnd.beeter.api.sting.collection+json",
			},
	})
	.done(function (data, status, jqxhr) {
		
		var sting = $.parseJSON(jqxhr.responseText);
		console.log(data);
		console.log('prova');
	  	$("#form25").text("ok correcto");
		$("#form25").text(
				"Username: " + sting.stings[0].username   + "\n" +
				"Content: " + sting.stings[0].content  + "\n" +
				"subject: " + sting.stings[0].subject + "\n" +
				"Username: " + sting.stings[1].username   + "\n" +
				"Content: " + sting.stings[1].content   + "\n" +
				"subject: " + sting.stings[1].subject + "\n" +
				"Username: " + sting.stings[2].username  + "\n" +
				"Content: " + sting.stings[2].content  + "\n" +
				"subject: " + sting.stings[2].subject + "\n" +
				"Username: " + sting.stings[3].username  + "\n" +
				"Content: " + sting.stings[3].content + "\n" +
				"subject: " + sting.stings[3].subject + "\n" );
		 $("#form3").text(JSON.stringify(sting, null, 5));
		 $("#form").text('hoooooleeeee');

		
			
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
		console.log(textStatus);

		
	});
 
}

function put(sting,stingid,user,pass) {
	var url = API_BASE_URL + '/stings/'+stingid;
	 
	$.ajax({
		url : url,
		type : 'PUT',
		dataType: 'json',
		crossDomain : true,
		data :  sting,
		username : user,
		password : pass,
		headers : {
			"Accept" : "application/vnd.beeter.api.sting+json",
			"Content-Type"	: "application/vnd.beeter.api.sting+json", 
		},
	})
	.done(function (data, status, jqxhr) {
		var sting = $.parseJSON(jqxhr.responseText);
		console.log(status);
		console.log(data);
      	$("#form3").text("Username: " + sting.username + "\n" +
      			"Content: " + sting.content + "\n" +
      			"Sting ID: " + sting.stingid + "\n" +
      			"Subject: " + sting.subject);
	})
    .fail(function (jqXHR, textStatus) {
		console.log(textStatus);
	});
}
 