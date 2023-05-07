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
    $this->conn->query("USE u22512323;");
}
public function __destruct() {}

public function getCars($apiKey, $type, $limit = -1, $sort = "", $order = "", $fuzzy = true, $search = null, $return = "*"){
    /*
    $query = "SELECT Apikey from Users where apikey = " . $apiKey;
    if (!$this->conn->query($query)) {
        echo "Invalid key";
        
        exit();
    }
    */
    $query = "SELECT ";
    if ($return == "*") {
        $query = $query . $return;
    } else {
        $query .= $return[0];
        for ($i=1; $i < count($return); $i++) {
            if ($return[$i] === "image") {
                $image = true;
            } else {
                $query = $query . ", " . $return[$i];
            }
        }
    }
    $query .= " FROM cars ";
    if ($search != NULL) {
        $query .= " WHERE ";
        if ($fuzzy == null || $fuzzy == true) {
            foreach ($search as $key => $value) {
                $query .= $key . " LIKE \"%" . $value . "%\" AND ";
            }
        } else {
            foreach ($search as $key => $value) {
                $query .= $key . " = " . $value . ", ";
            }
        }
        $query = substr($query, 0, -5);
    }
    if ($sort != NULL) {
        $query .= " ORDER BY " . $sort;
        if ($order != NULL) {
            $query .= " " . $order;
        }
    }
    if ($limit != NULL) {
        $query .= " LIMIT " . $limit;
    }

    $this->conn->query("USE u22512323;");
    //echo "<br><br> The query is: " . $query . "<br><br>";
    
    $result = $this->conn->query($query);
    $dataArr = array();
    
    $curl = curl_init();
    if ($result->num_rows > 0) {
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($image || $return == "*") {
                $url = "https://wheatley.cs.up.ac.za/api/getimage?brand=" . $row["make"] . "&model=" . $row["model"];
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($curl);
                if ($response === false) {
                    $error = curl_error($curl);
                } else {
                    $row["image"] = $response;
                }
            }
            array_push($dataArr, $row);
            
        }
    }
    curl_close($curl);

    $toPost = array();
    $toPost['status'] = "success";
    $toPost['timestamp'] = time();
    $toPost['data'] = $dataArr;
    echo json_encode($toPost);
}
}
$jsonData = file_get_contents('php://input');
$postObj = json_decode($jsonData, true); // Decodes JSON as associative array
$instance = Database::instance();
//$postObj = json_decode($_POST[0]);
set_error_handler(function() { /* ignore errors */ });
$instance->getCars($postObj["apikey"], "GetAllCars", $postObj["limit"], $postObj["sort"], $postObj["order"], $postObj["fuzzy"], $postObj["search"], $postObj["return"]);
restore_error_handler();
?>
