<?php
// schema , user    , password
//db319t25,dbu319t25,Metr?b5d
//post data from signup to mysql

$username = "dbu319t25";
$password = "Metr?b5d";
$dbServer = "mysql.cs.iastate.edu";
$dbName = "db319t25";

$conn = new mysqli($dbServer,$username,$password,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
  echo "Connected successfully<br>";
}

$userName = $_POST['userName'];
$pass = $_POST['Pass'];
$email = $_POST['Email'];
$phone = $_POST['Phone'];
$librarian = $_POST['Librarian'];
$firstName = $_POST['FirstName'];
$lastName = $_POST['LastName'];

$sql = "INSERT INTO users (userName, Password, Email, Phone, Librarian, FirstName, LastName) 
VALUES ('$userName', '$pass', '$email', $phone, $librarian, '$firstName', '$lastName')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>