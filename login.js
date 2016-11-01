

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
					//console.log(data);
					if(data.status != false){
						//if checkLogin.php returns true, show library data
			 			$('#signIn').hide();
			 			$('#libraryDiv').show();
			 			$('#session').show();
						if(data.librarian != false){
			 				$('#librarian').show();
			 			}
						$.ajax({
							type:'POST',
							//dataType:'json',
							url:"session.php",
							data:user,
							success : function(data){
								console.log(data);
								$('#session').html(data);
							}
						});
					} else {
						console.log("username/password incorrect");
					}
				}	
			});
			$.get("populateLibrary.php", function(data) {
			
				//while(data.books.length > 0){
				var parsed = JSON.parse(data);
				var books = parsed.books;
				//console.log(books);
				for(i = 0; i < books.length; i++ ){
					// var author = JSON.stringify(data.books[i].author);
					var author = books[i].Author;
					var title = books[i].BookTitle;
					// var title = JSON.stringify(data.books[i].title);
					 var id = parseInt(books[i].bookId);
					var availability = books[i].Availability;
					//var numberOfBooksOnShelf = books[i].numberOfBooksOnShelf;
					var shelfNum = parseInt(books[i].shelfId);
					// var availability = JSON.stringify(data.books[i].availability);
					// var numberOfBooksOnShelf = data.books[i].numberOfBooksOnShelf;
					var shelf = books[i].shelfName;
					addNewBook(shelf,shelfNum,title,author,id,availability);
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
					//var title = JSON.stringify(data.title);
					var title = data.title;
					var id = data.id;
					var shelf = JSON.stringify(data.shelf);
					var availability = JSON.stringify(data.availability);
					//var numberOfBooksOnShelf = data.numberOfBooksOnShelf;
					var shelfnum = data.shelfnum;
					//console.log(availability);
					addNewBook(shelf,shelfnum,title,author,id,availability);

				}
			});
		});

		$('#deleteBook').click(function(){
			var bookId = document.forms["delete"]["bookIdD"].value;
			console.log(bookId);
			var book = {
				id:bookId
			};
			$.ajax({
				type:'POST',
				url:"deleteBook.php",
				dataType:'json',
				data:book,
				success : function (data) {
					console.log(data);
					var book = data;
					//var book = parsed.book;					//var author = JSON.stringify(data.author);
					//var title = JSON.stringify(data.title);
					//var title = data.title;
					var id = book.BookId;
					//var shelf = JSON.stringify(data.shelf);
					//var availability = JSON.stringify(data.availability);
					//var numberOfBooksOnShelf = data.numberOfBooksOnShelf;
					var shelfnum = book.ShelfId;
					//console.log(availability);
					//addNewBook(shelf,shelfnum,title,author,id,availability);
					deleteBook(id,shelfnum);
				}
			});			
		});

});

function deleteBook(id,shelfnum){
	//find row that cell value is in
	//find the column using the shelfnum property
	//delete cell
	//shift cells up (?)
	var table = document.getElementById("library");

	var tableRow = $("td").filter(function() {
    	return $(this).text() == id;
	}).closest("tr");
	console.log("tableRow:"+tableRow.innerHTML);

	var row = table.rows[tableRow];
	//row.deleteCell(shelfnum-1);
}




function addNewBook(shelf,shelfNum,title,author,id,availability){
	//var numberOfBooksOnShelf = JSON.stringify(data.numberOfBooksOnShelf);
	var table = document.getElementById("library");
	var length = document.getElementById("library").rows.length;
	numberOfBooksOnShelf = 1;
	for (var i=1; i<length;i++) {
		if (document.getElementById("library").rows[i].cells.length >= shelfNum && document.getElementById("library").rows[i].cells[shelfNum-1].innerHTML !== "") {
			numberOfBooksOnShelf++;
		}else {
			break;
		}
	}

	if(canAddBook(numberOfBooksOnShelf)){
		//var addRow = addToRow(numberOfBooksOnShelf);
		//var row = document.getElementById(addRow);
		//console.log("length before insertion:"+length);
		//console.log("number of books on shelf:"+numberOfBooksOnShelf);
		//console.log("book id:"+id);
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
	var output = "Title: "+ title + "; Author: "+author+";ID: "+id+"; Availability: "+availability;
	alert(output);
}