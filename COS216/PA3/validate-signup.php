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

    if($conn->query("USE u22512323") === true)
        echo "New record created successfully";
    else
        echo "Error: " . "<br>" . $conn->error;

    echo "Connected successfully";
    $userPass = $_POST["password"];
    $salt = $_POST["name"] . $_POST["surname"];
    $userPass = $userPass . $salt;
    $userPass = md5($userPass, false);
    $apiKey = "";
    for ($i=0; $i < 10; $i++) { 
        $apiKey = $apiKey . chr(rand(0,62) + 65);
    }
    $query = "INSERT INTO Users (Name, Surname, Email, Password, APIKey) VALUES ('" . $_POST["name"] . "', '" . $_POST["surname"] . "', '" . $_POST["email"] . "', '" . $userPass . "', '" . $apiKey . "')";
    try {
        if($conn->query($query) === true)
            echo "New record created successfully";
        else
            echo "Error: " . $query . "<br>" . $conn->error;
        
    } catch (\Throwable $th) {
        //echo 'Email already in use';
        //header("Location: ./signup.php");
        //exit;
    }
    header("Location: ./index.php");
    exit;
?>