<?php
//if(!isset($_SESSION["login"]))
$login = array();
session_start();
$_SESSION["username"] = $_POST['name'];
$_SESSION["password"] = $_POST['password'];

$login["username"] = $_SESSION["username"];
$login["password"] = $_SESSION["password"];

echo json_encode($login);

?>