	function validateForm(username,password,confirmPass,email,phone,librarian,firstName,lastName){
		var reg = /[^A-Za-z0-9 ]*/g;
		if(!username.match(reg)) {
			console.log(username);
			alert('Username not alphanumeric. Enter username using alphanumeric characters.');
			return false;
		}

		if(!firstName.match(reg)){
			alert('First name not alphanumeric.');
			return false;
		}
		if(!lastName.match(reg)){
			alert('Last name not alphanumeric.');
			return false;
		}
		if(password !== confirmPass){
			alert('Passwords do not match. Make sure to re-enter your password in Confirm Password');
			return false;
		}
		var at = email.indexOf("@");
		if(at == -1){
			alert('Format email address as such: email@foo.com');
			return false;		
		}
		var beforeAt = email.substring(0,at);
		if(!beforeAt.match(reg)){
			alert('Email address not alphanumeric. Enter email using alphanumeric characters.');
			return false;		
		}
		if(!email.includes(".")){
			alert('Format email address as such: email@foo.com');
			return false;		
		}
		var regnum = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
		if(!phone.match(regnum)){
			alert('Phone number format incorrect. Please use xxx-xxx-xxxx.');
			return false;
		}
		return true;
	}
	$(document).ready(function(){

	$('#signUp').click(function(){
		var username = document.forms["myForm"]["user"].value;
		var password = document.forms["myForm"]["psw"].value;
		var confirmPass = document.forms["myForm"]["confirmpsw"].value;
		var email = document.forms["myForm"]["Email"].value;
		var phone = document.forms["myForm"]["phone"].value;
		if(document.getElementById('yesLibrarian').checked){
			var librarian = true;
		} else {
			var librarian = false;
		}
		var firstName = document.forms["myForm"]["firstName"].value;
		var lastName = document.forms["myForm"]["lastName"].value;

		if(validateForm(username,password,confirmPass,email,phone,librarian,firstName,lastName)){
			var user = {
				userName:username,
				Pass:password,
				Email:email,
				Phone:phone,
				Librarian:librarian,
				FirstName:firstName,
				LastName:lastName
			};
			$.ajax({
				type:'POST',
				url:"library.php",
				dataType:'json',
				data:user,
				success : function (data) {
					console.log(data);
					window.location.href='login.html';
					// $.ajax({
					// 	type:'POST',
					// 	url:"session.php",
					// 	dataType: 'json',
					// 	data: user,
					// 	success : function (data){
					// 		console.log(data);
					// 		window.location ='login.html';
					// 	}
					// });
				}
			});
		}
	});
});