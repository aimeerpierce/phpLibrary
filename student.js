$(document).ready(function () {

    $.get("populateLibrary.php", function (data) {
        var parsed = JSON.parse(data);
        var books = parsed.books;
        for (i = 0; i < books.length; i++) {
            var author = books[i].Author;
            var title = books[i].BookTitle;
            var id = parseInt(books[i].bookId);
            var availability = books[i].Availability;
            var shelfNum = parseInt(books[i].shelfId);
            var shelf = books[i].shelfName;
            addNewBook(shelf, shelfNum, title, author, id, availability);
        }
    });

    $('#borrowButton').click(function () {
        var bookId = document.forms["borrow"]["borrowID"].value;
        var date = new Date();
        var dueDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

        var book = {
            command: "borrow",
            id: bookId,
            dueDate: dueDate
        };
        $.ajax({
            type: 'POST',
            url: "student.php",
            dataType: 'json',
            data: book,
            success: function (data) {
                console.log(data);
                console.log(data.status);
                if (data.status == false) {
                    alert("This book is unavailable.");
                }
                else {
                    alert("borrowed successfully");
                    location.reload();
                }
            }
        });

    });

    $('#returnButton').click(function () {
        var bookId = document.forms["return"]["returnID"].value;
        var date = new Date();
        var returnedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
        var book = {
            command: "return",
            id: bookId,
            returnedDate: returnedDate
        };
        $.ajax({
            type: 'POST',
            url: "student.php",
            dataType: 'json',
            data: book,
            success: function (data) {
                console.log(data);
                console.log(data.status);
                if (data.status == false) {
                    alert("You cannot return this book.");
                }
                else {
                    alert("returned successfully");
                    location.reload();
                }
            }
        });

    });


});


function addNewBook(shelf, shelfNum, title, author, id, availability) {
    var table = document.getElementById("library");
    var length = document.getElementById("library").rows.length;
    numberOfBooksOnShelf = 1;
    for (var i = 1; i < length; i++) {
        if (document.getElementById("library").rows[i].cells.length >= shelfNum && document.getElementById("library").rows[i].cells[shelfNum - 1].innerHTML !== "") {
            numberOfBooksOnShelf++;
        } else {
            break;
        }
    }

    if (canAddBook(numberOfBooksOnShelf)) {
        var num = shelfNum - 1;
        if (length <= numberOfBooksOnShelf) {
            var row = table.insertRow(length);
        } else {
            var row = table.rows[numberOfBooksOnShelf];
        }
        if (row.cells.length <= num) {
            for (var i = row.cells.length; i <= num; i++) {
                var cell = row.insertCell(i);
            }
        }
        row.cells[num].innerHTML = title + "   ID: " + id;
        addStatusEvent(row.cells[num], title, author, id, availability);
    } else {
        console.log(numberOfBooksOnShelf);
        console.log("Can't add book to shelf");
    }
}


function canAddBook(shelf, numberOfBooksOnShelf) {
    if (numberOfBooksOnShelf >= 5) {
        console.log("The " + shelf + " shelf is full.");
        return false;
    } else {
        return true;
    }
}

function addToRow(numberOfBooksOnShelf) {
    if (numberOfBooksOnShelf = 0) {
        var ret = "row1";
    }
    if (numberOfBooksOnShelf = 1) {
        var ret = "row2";
    }
    if (numberOfBooksOnShelf = 2) {
        var ret = "row3";
    }
    if (numberOfBooksOnShelf = 3) {
        var ret = "row4";
    }
    if (numberOfBooksOnShelf = 4) {
        var ret = "row5";
    }
    return ret;
}

function addStatusEvent(cell, title, author, id, availability) {
    cell.addEventListener("click", function () {
        displayInfo(title, author, id, availability);
    });
}
function displayInfo(title, author, id, availability) {
    var output = "Title: " + title + "\r\nAuthor: " + author + "\r\nID: " + id + "\r\nAvailability: " + availability;
    alert(output);
}