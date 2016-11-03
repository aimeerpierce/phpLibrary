<?php
session_start();

$return = array(
	"status"=>false,
	"error"=>"none",
);

$command = $_POST['command'];
$id = $_POST['id'];
$user = $_SESSION['username'];
$status = "true";


$username = "dbu319t25";
$password = "Metr?b5d";
$dbServer = "mysql.cs.iastate.edu";
$dbName = "db319t25";

$conn = new mysqli($dbServer,$username,$password,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(strcmp($command,'return')==0){
	$ReturnedDate = $_POST['returnedDate'];

	$sql = "UPDATE loanHistory SET ReturnedDate='$ReturnedDate' WHERE BookId='$id'";
	$sql2 = "UPDATE books SET Availability='1' WHERE BookId='$id'";

	$sql3 = "select bookId, Availability from books";
	$result = $conn->query($sql3);

	if ($conn->query($sql) !== TRUE) {
		$return["error"] = "Error: " . $sql . "<br>" . $conn->error;
	}

	if($result->num_rows > 0){

		while($row = $result->fetch_assoc()){
			if( (strcmp($row["bookId"],$id) == 0) && (strcmp($row["Availability"],"1") == 0) ){
				//$return["status"] = false;
				//$return["error"] = "cannotReturn";
				//mysqli_close($conn);
				//echo json_encode($return);
				$status = "flase";
			}
		}
	}


}
else{
	$dueDate = $_POST['dueDate'];
	$sql = "INSERT INTO loanHistory (UserName, BookId, DueDate)
	VALUES ('$user', '$id', '$dueDate')";

	$sql2 = "UPDATE books SET Availability='0' WHERE BookId='$id'";

	$sql3 = "select bookId, Availability from books";
	$result = $conn->query($sql3);

	if ($conn->query($sql3) !== TRUE) {
		$return["error"] = "Error: " . $sql . "<br>" . $conn->error;
	}

	if($result->num_rows > 0){

		while($row = $result->fetch_assoc()){
			if( (strcmp($row["bookId"],$id) == 0) && (strcmp($row["Availability"],"0") == 0) ){
				//$return["status"] = false;
				//$return["error"] = "cannotBorrow";
				//mysqli_close($conn);
				//echo json_encode($return);
				$status = "flase";
			}
		}
	}
}

if(strcmp($status,"true")==0){
	if ($conn->query($sql) === TRUE && $conn->query($sql2) === TRUE) {
		$return["status"] = true;
	} else {
		$return["error"] = "Error: " . $sql . "<br>" . $conn->error;
	}
}
else{
	$return["status"] = false;
	$return["error"] = "cannotBorrow";
}

mysqli_close($conn);
echo json_encode($return);
?>