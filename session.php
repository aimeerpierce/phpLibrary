<?php

session_start();
$_SESSION["name"] = $_POST['uname'];
echo $_SESSION["name"];


?>