<?php

$username = "dbu319t25";
$password = "Metr?b5d";
$dbServer = "mysql.cs.iastate.edu";
$dbName = "db319t25";

$conn = new mysqli($dbServer,$username,$password,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST["username"];
$userData = array();
//$userData["name"] = $username;
$error = array();
$sql = "SELECT BookId, DueDate, ReturnedDate FROM loanHistory WHERE UserName='$username'";
$result = $conn->query($sql);

if($result->num_rows > 0){
	//$userData["name"] = $username;
	while($row = $result->fetch_assoc()){
		$user = array();
		$user["BookId"]=$row["BookId"];
		$user["DueDate"]=$row["DueDate"];
		$user["ReturnedDate"]=$row["ReturnedDate"];
		$user["status"]=true;
		array_push($userData, $user);
	}
} else {
	$error["message"] = "Error: " . $sql . "<br>" . $conn->error;
}
//echo json_encode($userData);
echo json_encode(array("user"=>$userData,"error"=>$error));
?>