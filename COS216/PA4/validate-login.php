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
    $query = "SELECT * FROM Users WHERE Email='" . $_POST["email"] . "';";
    echo $query;
    try {
        $result = $conn->query($query);
        if ($result) {
            if ($result->num_rows > 0) {
                $givenPass = $_POST["password"];
                $row = $result->fetch_assoc();
                $correctPass = $row["Password"];
                $salt = $row["Name"] . $row["Surname"];
                $givenPass = $givenPass . $salt;
                $givenPass = md5($givenPass, false);
                if ($givenPass === $correctPass) {
                    
                    echo '<script type="text/javascript"> 
                    function setCookie(cname, cvalue, exdays) {
                        const d = new Date();
                        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                        let expires = "expires="+d.toUTCString();
                        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                    };
                    setCookie("APIKey", "' . $row["APIKey"] . '", 1);
                    alert("You are now logged in"); 
                    window.location.href="index.php";
                    </script>';
                } else {
                    echo '<script type="text/javascript"> alert("Incorrect Login Details"); window.location.href="login.php";</script>';
                }
            } else {
                echo '<script type="text/javascript"> alert("No user found"); window.location.href="login.php";</script>';
            }
        } else {
            echo '<script type="text/javascript"> alert("Query Failed"); window.location.href="login.php";</script>';
        }
    } catch (\Throwable $th) {
        echo $th;
        echo '<script type="text/javascript"> alert("No user found"); window.location.href="login.php";</script>';
    }
?>