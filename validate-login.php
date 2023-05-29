<?php
    $servername = "wheatley.cs.up.ac.za";
    $username = "u22512323";
    $password = "UFYT4LNTU7XNWZGY2NW7OR7FBYSBNNVW";
    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if($conn->query("USE u22512323;") === true){
        //echo "Connected successfully<br>";
    }
    $jsonData = file_get_contents('php://input');
    $postObj = json_decode($jsonData, true); 
    if (!isset($postObj["email"])) {
        //echo "param bad";
        die();
    }
    if (!isset($postObj["password"])) {
        die();
    }
    //echo $jsonData;
    $query = "SELECT * FROM Users WHERE Email='" . $postObj["email"] . "';";
    //echo $query;
    try {
        $result = $conn->query($query);
        if ($result) {
            if ($result->num_rows > 0) {
                $givenPass = $postObj["password"];
                $row = $result->fetch_assoc();
                $correctPass = $row["Password"];
                $salt = $row["Name"] . $row["Surname"];
                $givenPass = $givenPass . $salt;
                $givenPass = md5($givenPass, false);
                if ($givenPass === $correctPass) {
                    
                    echo $row['APIKey'];
                } else {
                    //echo 'Incorrect Login Details';
                }
            } else {
                //echo 'No user found';
            }
        } else {
            //echo 'Query Failed';
        }
    } catch (\Throwable $th) {
        echo $th;
        //echo 'No user found';
    }
?>