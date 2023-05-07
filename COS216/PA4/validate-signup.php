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
        echo "Connected successfully<br>";
    }

    $userPass = $_POST["password"];
    $salt = $_POST["name"] . $_POST["surname"];
    $userPass = $userPass . $salt;
    $userPass = md5($userPass, false);
    $apiKey = "";
    for ($i=0; $i < 5; $i++) { 
        $apiKey = $apiKey . chr(rand(0,52) + 65);
    }
    for ($i=0; $i < 5; $i++) { 
        $apiKey = $apiKey . rand(0,9) + 65;
    }
    $query = "INSERT INTO Users (Name, Surname, Email, Password, APIKey) VALUES ('" . $_POST["name"] . "', '" . $_POST["surname"] . "', '" . $_POST["email"] . "', '" . $userPass . "', '" . $apiKey . "');";
    try {
        echo "query: " . $query;
        $conn->query($query);
        echo $conn->query("SELECT * FROM CARS;");
        
    } catch (\Throwable $th) {
        header("HTTP/1.1 400 Bad Request");
        echo 'Email already in use<br>';
        echo "<a href=\"./signup.php\">Sign up again</a>";
        exit;
    }
    header("HTTP/1.1 200 OK");
    echo 'Your API Key<br>';
    echo $apiKey;
    echo "<a href=\"./index.php\">Go to home page</a>";
    exit;
?>