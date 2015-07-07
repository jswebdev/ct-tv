<?php
header('Content-Type: application/json');
$host = 'host';
$username = 'username';
$password= 'password';
$db = 'db';
$conn = new MySQLi($host, $username, $password, $db); 
if ($conn->connect_error) {
	echo 'Connection error';
	exit();
}
$sql = "SELECT * FROM captain_taco";
$results = $conn->query($sql);
$output;
while($row = $results->fetch_assoc()) {
	$output[] = $row;
}
echo json_encode($output);
$conn->close();
die();
?>