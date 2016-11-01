<?php

$username = "dbu319t25";
$password = "Metr?b5d";
$dbServer = "mysql.cs.iastate.edu";
$dbName = "db319t25";

$conn = new mysqli($dbServer,$username,$password,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//ShelfId | ShelfName | BookId
$sql = "SELECT * FROM books inner join shelves on books.bookId=shelves.BookId";
$result = $conn->query($sql);
$books = array();
$error = array();
$count = 0;

if($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$book = array();
		$book["bookId"] = $row["BookId"];
		$book["shelfId"] = $row["ShelfId"];
		$book["shelfName"] = $row["ShelfName"];
		$book["Author"] = $row["Author"];
		$book["BookTitle"] = $row["BookTitle"];
		$book["Availability"] = $row["Availability"];
		$book["status"] = true;
		array_push($books, $book);
	}
} else {
	$error["message"] = "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode(array("books"=>$books,"error"=>$error));
// {
// 	"books": [{},{},{}],
// 	"error": "..."
// }
?>
