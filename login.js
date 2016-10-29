$(document).ready(function(){
		$('#login').click(function(){
			var username = document.forms["myForm"]["user"].value;
			var pass = document.forms["myForm"]["psw"].value;

			var user = {
				name:username,
				password:pass
			};

			$.ajax({
				type:'POST',
				url:"checkLogin.php",
				dataType: 'json',
				data: user,
				success : function (data) {
					console.log(data);
					if(data.status != false){
						//if checkLogin.php returns true, show library data
						$('#signIn').hide();
						$('#libraryDiv').show();
						if(data.librarian != false){
							$('#librarian').show();
						}
					} else {
						console.log("username/password incorrect");
					}
				}	
			});
		});
		$('#addBook').click(function(){
			var bookId = document.forms["add"]["bookIdA"].value;
			var bookAuthor = document.forms["add"]["author"].value;
			var bookTitle = document.forms["add"]["bookTitleA"].value;
			var shelfName = document.forms["add"]["shelf"].value;

			if (shelfName == "Art"){
				var shelfNum = 1;
			}
			if(shelfName =="Science"){
				var shelfNum=2;
			}
			if(shelfName =="Sport"){
				var shelfNum=3;
			}
			if(shelfName =="Literature"){
				var shelfNum=4;
			}
			var book = {
				ID:bookId,
				Author:bookAuthor,
				Title:bookTitle,
				ShelfName:shelfName,
				ShelfNum:shelfNum
			};

			$.ajax({
				type:'POST',
				url:"addBook.php",
				dataType:'json',
				data:book,
				success : function (data) {
					console.log(data);
					var author = JSON.stringify(data.author);
					var title = JSON.stringify(data.title);
					var id = data.id;
					var shelf = JSON.stringify(data.shelf);
					var availability = JSON.stringify(data.availability);
					var numberOfBooksOnShelf = data.numberOfBooksOnShelf;
					var shelfnum = data.shelfnum;
					//console.log(availability);
					addNewBook(shelf,shelfnum,numberOfBooksOnShelf,title,author,id,availability);
					//addNewBook(data);

				}
			})
		});

		$('#deleteBook').click(function(){
			var bookId = document.forms["delete"]["bookIdD"].value;
			console.log(bookId);
			var book = {
				id:bookId
			};
			// $.ajax({
			// 	type:'POST',
			// 	url:"deleteBook.php",
			// 	dataType:'json',
			// 	data:'book',
			// 	success : function(data) {
			// 		console.log(data);
			// 	}
			// })
		});

});

function deleteBook(id,shelfnum){
	//find row that cell value is in
	//find the column using the shelfnum property
	//delete cell
	//shift cells up (?)
	var tableRow = $("td").filter(function() {
    	return $(this).text() == id;
	}).closest("tr");
	var row = table.rows[tableRow];
	row.deleteCell(shelfnum-1);
}



function addNewBook(shelf,shelfNum,numberOfBooksOnShelf,title,author,id,availability){
	//var numberOfBooksOnShelf = JSON.stringify(data.numberOfBooksOnShelf);
	var table = document.getElementById("library");
	var length = document.getElementById("library").rows.length;

	if(canAddBook(numberOfBooksOnShelf)){
		//var addRow = addToRow(numberOfBooksOnShelf);
		//var row = document.getElementById(addRow);
		console.log("length before insertion:"+length);
		console.log("number of books:"+numberOfBooksOnShelf);
		var num = shelfNum - 1;
		if(length <= numberOfBooksOnShelf){
			var row = table.insertRow(length);
		} else {
			var row = table.rows[numberOfBooksOnShelf];
		}
		if(row.cells.length <= num){
			for(var i = row.cells.length; i <= num; i++){
				var cell = row.insertCell(i);
			}
		}
		//var cell = row.insertCell(num);
		row.cells[num].innerHTML = id;
		addStatusEvent(row.cells[num],title,author,id,availability);
	}else{
		console.log(numberOfBooksOnShelf);
		console.log("Can't add book to shelf");
	}
}


function canAddBook(shelf,numberOfBooksOnShelf){
	if(numberOfBooksOnShelf >= 5){
		console.log("The "+ shelf + " shelf is full.");
		return false;
	}else{
		return true;
	}
}

function addToRow(numberOfBooksOnShelf){
	if(numberOfBooksOnShelf = 0){
		var ret = "row1";
	}
	if(numberOfBooksOnShelf = 1){
		var ret = "row2";
	}
	if(numberOfBooksOnShelf = 2){
		var ret = "row3";
	}
	if(numberOfBooksOnShelf = 3){
		var ret = "row4";
	}
	if(numberOfBooksOnShelf = 4){
		var ret = "row5";
	}
	return ret;
}

function addStatusEvent(cell,title,author,id,availability){
	cell.addEventListener("click",function(){
			displayInfo(title,author,id,availability);
	});
}
function displayInfo(title,author,id, availability){
	// if(availability !=0){
	// 	var a = "available.";
	// }else{
	// 	var a = "not available.";
	// }
	var output = title;
	alert(output);
}