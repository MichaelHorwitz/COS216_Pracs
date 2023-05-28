<!DOCTYPE html>
<head lang="en">
    <title>CarTographer</title>
    <link rel="stylesheet" type="text/css" href="./css/logout.css">
    <meta charset="utf-8">
</head>

<body>
    <?php
        include "header.php";
    ?>
    <button id="logout">Logout</button>
    <?php
        include "footer.php";
    ?>
    <script>
        logout = function(){
            localStorage.removeItem("APIKey");
            alert("You are now logged out");
        };
        document.getElementById("logout").addEventListener("click", logout);
    </script>
</body>