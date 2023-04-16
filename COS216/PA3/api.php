<?php
class Database
{
public static function instance()
{
static $instance = null; // remember that this only ever gets called once
if($instance === null) $instance = new Database();
return $instance;
}
private function __construct() {     
    $servername = "wheatley.cs.up.ac.za";
    $username = "u22512323";
    $password = "UFYT4LNTU7XNWZGY2NW7OR7FBYSBNNVW";
    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
}
public function __destruct() { /* Disconnect from the database */ }
public function addUser($apiKey, $type, $limit, $sort, $order, $fuzzy, $search, $return){ /* Add to the database */ }
}
$instance = Database::instance();
$instance->addUser("satoshi");
?>
