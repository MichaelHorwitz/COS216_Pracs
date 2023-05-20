<?php
    class Database{
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
            $this->conn->query("USE u22512323_;");
        }
        public function __destruct() {
            
        }
        public function getRandomBrands(){
            $query = "SELECT BrandName, BrandImg FROM CarBrands ORDER BY RAND() LIMIT 1";
            $result = $this->conn->query($query);
            $row = $result->fetch_assoc();
            $sendObj = array(
                'BrandName' => $row['BrandName'],
                'Brandimg' => $row['BrandImg']
            );
            echo json_encode($sendObj);
            die();
        }
    }
    $requestURI = $_SERVER['REQUEST_URI'];
    if ($requestURI !== '/api.php/GetRandomCars') {
        header("HTTP/1.1 400 Bad Request");
        echo "Incorrect endpoint<br>";
        echo $requestURI;
        die();
    }
    $instance = Database::instance();
    $instance->getRandomBrands();
?>