<?php
class Database
{
    public $conn;
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
    $this->conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($this->conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //use u22512323
}
public function __destruct() {}

public function getCars($apiKey, $type, $limit = -1, $sort = "", $order = "", $fuzzy = true, $search = null, $return = "*"){
    $query = "SELECT Apikey from Users where apikey = " . $apiKey;
    if (!$this->conn->query($query)) {
        echo "Invalid key";
        die();
    }
    $query = "SELECT ";
    if ($return == "*") {
        $query = $query . $return;
    } else {
        $query = $return[0];
        for ($i=1; $i < count($return); $i++) { 
            $query = $query . ", " . $return[$i];
        }
    }
    $query .= " FROM cars ";
    if ($search != NULL) {
        $query .= " WHERE ";
        if ($fuzzy == null || $fuzzy == true) {
            foreach ($search as $key => $value) {
                $query .= $key . " LIKE %" . $value . "%, ";
            }
        } else {
            foreach ($search as $key => $value) {
                $query .= $key . " = " . $value . ", ";
            }
        }
        $query = substr($query, 0, -2);
    }
    if ($limit != NULL) {
        $query .= " LIMIT " . $limit;
    }
    if ($sort != NULL) {
        $query .= " ORDER BY " . $sort;
        if ($order != NULL) {
            $query .= " " . $order;
        }
    }
    //echo "THIS IS CONN" . $this->conn;
    //echo $this->conn->query($query);
    $servername = "wheatley.cs.up.ac.za";
    $username = "u22512323";
    $password = "UFYT4LNTU7XNWZGY2NW7OR7FBYSBNNVW";
    $conn = new mysqli($servername, $username, $password);
    $conn->query("USE u22512323;");
    $result = $conn->query($query);
    $dataArr = array();
    //echo "This is the query<br>";
    //print_r ($query);
    //echo "<br>";
    if ($result->num_rows > 0) {
    // output data of each row
        $i = 0;
        while($row = $result->fetch_assoc()) {
            //print_r($row);
            //echo "<br>NEW ROW";
            //$dataArr[$i] = $row;
            array_push($dataArr, $row);
        }
    }
    $toPost = array();
    $toPost['status'] = "success";
    $toPost['timestamp'] = time();
    $toPost['data'] = $dataArr;
    echo json_encode($toPost);    
}
}
//print_r($_POST);
$instance = Database::instance();
$postObj = json_decode($_POST[0]);
$instance->getCars("1234", "GetAllCars", $postObj["limit"], $postObj["sort"], $postObj["order"], $postObj["fuzzy"], $postObj["search"], "*");
?>
