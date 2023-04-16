<!--Michael Horwitz u22512323-->
<!DOCTYPE html>
<head lang="en">
    <title>CarTographer</title>
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <meta charset="utf-8">
</head>
<body>
    <form id="form" action="./validate-signup.php" method="post">
            Name<br><input type="text" name="name" id="name"><br>
            Surname<br><input type="text" name="surname" id="surname"><br>
            Email<br><input type="text" name="email"id="email"><br>
            <div id="emailErr"></div>
            Password<br><input type="text" name="password" id="password" value=""><br>
            <div id="passErr"></div>
            <input type="button" value="Register" id="subBut">
    </form>
    <script>
        function checkEmail(){
            var emailBox = document.getElementById("email");
            var emailStr = emailBox.value;
            //console.log(emailBox);
            //console.log(emailStr);
            if (emailStr.search("@") === -1){
                document.getElementById("emailErr").innerHTML = "Invalid Email";
                return false;
            }
            //alert("true");
            document.getElementById("emailErr").innerHTML = "";
            return true;
        }
        function checkPassword(){
            var passBox = document.getElementById("password");
            var passStr = passBox.value;
            if (passStr.length > 8) {
                if (passStr.search("[a-b]") === -1 ) {
                    document.getElementById("passErr").innerHTML = "Password must contain lower case";
                    return false;
                } else if (passStr.search("[A-B]") === -1 ) {
                    document.getElementById("passErr").innerHTML = "Password must contain upper case";
                    return false;
                } else if (passStr.search("[0-9]")  === -1){
                    document.getElementById("passErr").innerHTML = "Password must contain number";
                    return false;
                } else if (passStr.search(/\W|_/g) === -1){
                    document.getElementById("passErr").innerHTML = "Password must contain symbol";
                    return false;
                }
                document.getElementById("passErr").innerHTML = "";
                return true;
            } else {
                document.getElementById("passErr").innerHTML = "Password must be more than 8 characters long";
                return false;
            }
            return true;
        }
        function onSubmit(){
            if (checkEmail() && checkPassword()) {
                document.getElementById("form").submit();
            } else {
                return false;
            }
        }
        document.getElementById("subBut").addEventListener("click", onSubmit);
    </script>
</body>