<!DOCTYPE html>
<head lang="en">
    <title>CarTographer</title>
    <link rel="stylesheet" type="text/css" href="./css/login.css">
    <meta charset="utf-8">
</head>

<body>
    <?php
        include "header.php";
    ?>
    <header class="main_head">
        <h1>Login</h1>
    </header>
    <form id="loginForm" action="./validate-login.php" method="post">
        Email
        <input type="text" id="email" name="email">
        Password
        <input type="password" id="password" name="password">
        <button id="subBut">Submit</button>
    </form>
    
    <script>
        function onSubmit(){
                document.getElementById("loginForm").submit();

        }
        document.getElementById("subBut").addEventListener("click", onSubmit);
    </script>
    <?php
        include "footer.php";
    ?>
</body>