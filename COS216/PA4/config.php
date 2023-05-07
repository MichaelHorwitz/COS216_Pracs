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
    //use u22512323
}
public function __destruct() { /* Disconnect from the database */ }
public function addUser($apiKey, $type, $limit = -1, $sort = "", $order = "", $fuzzy = true, $search = null, $return = "*"){
    $query = "SELECT ";
    if ($query == "*") {
        $query = $query . $return;
    } else {
        $query = $return[0];
        for ($i=1; $i < count($return); $i++) { 
            $query = $query . ", " . $return[$i];
        }
    }
    $query .= " FROM cars ";
    $query .= " WHERE ";
    foreach ($search as $key => $value) {
        $query .= $key . " = " . $value . ", ";
    }
    foreach ($search as $key => $value) {
        $query .= $key . " LIKE %" . $value . "%, ";
    }
    $query = substr($query, 0, -2);
    $query .= " LIMIT " . $limit;
    $query .= " ORDER BY " . $sort;
    $query .= " " . $order;
}
}
?>