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
    $query = "INSERT INTO Users (Name, Surname, Email, Password, APIKey) VALUES ('" . $_POST["name"] . "', '" . $_POST["surname"] . "', '" . $_POST["email"] . "', '" . $_POST["password"] . "', '1234567890')";
    if($conn->query($query) === true)
        echo "New record created successfully";
    else
        echo "Error: " . $query . "<br>" . $conn->error;
?>