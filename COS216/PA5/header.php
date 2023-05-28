<!DOCTYPE html>
<nav>
    <ul class="navbar">
        <li><img src="./img/logo.png" alt="Image not found"></li>
        <li><a href="./Index.php" id="IndexNav">Cars</a></li>
        <li><a href="./Brands.php" id="BrandsNav">Car Brands</a></li>
        <li><a href="./FindCar.php" id="FindCarNav">Find me a car</a></li>
        <li><a href="./Compare.php" id="CompareNav">Compare</a></li>
        <li><a href="./login.php" id="LoginNav">Login</a></li>
        <li><a href="./signup.php" id="SignUpNav">Sign Up</a></li>
    </ul>
    <script>
        if(localStorage.getItem("APIKey")){
            var navChange = document.getElementById("LoginNav");
            navChange.setAttribute("href", "./logout.php");
            navChange.setAttribute("id", "LogOutNav");
            navChange.innerHtml = "Log Out";
        } else {
            var navChange = document.getElementById("LogOutnNav");
            navChange.setAttribute("href", "./login.php");
            navChange.setAttribute("id", "LoginNav");
            navChange.innerHtml = "Log In";
        }
    </script>
</nav>
