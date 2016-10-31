<?php
//
$count = 1;
$username = "dbu319t25";
$password = "Metr?b5d";
$dbServer = "mysql.cs.iastate.edu";
$dbName = "db319t25";

$conn = new mysqli($dbServer,$username,$password,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$bookId = $_POST['ID'];
$author = $_POST['Author'];
$title = $_POST['Title'];
$shelfname = $_POST['ShelfName'];
$shelfnum = $_POST['ShelfNum'];


$sql = "INSERT INTO books (BookId, BookTitle, Author, Availability) 
VALUES ('$bookId', '$title', '$author','1')";

$sql2 = "INSERT INTO shelves (ShelfId, ShelfName, BookId)
VALUES ('$shelfnum','$shelfname','$bookId')";

$sql3 = "SELECT ShelfId FROM shelves WHERE ShelfId=$shelfnum";
$shelves =$conn->query($sql3);
$row_count = $shelves->num_rows +1;//f($shelves->num_rows > 0){

    	// while( $row = $shelves->fetch_assoc() ){
    	// 	$book["numberOfBooksOnShelf"]++;
    	// 	//$count++;
    	// }
//}
if ($conn->query($sql) === TRUE && $conn->query($sql2) === TRUE) {
    $book["status"] = true;
} else {
	$book["error"] = "Error: " . $sql . "<br>" . $conn->error;
}

$book = array(
	"status"=>false,
	"error"=>"none",
	"author"=>$author,
	"title"=>$title,
	"id"=>$bookId,
	"shelf"=>$shelfname,
	"shelfnum"=>$shelfnum,
	"availability"=>1,
	"numberOfBooksOnShelf"=>$row_count
);

mysqli_close($conn);

echo json_encode($book);

?>