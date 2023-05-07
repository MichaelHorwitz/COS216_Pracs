<!--Michael Horwitz u22512323-->
<!DOCTYPE html>
<head lang="en">
    <title>CarTographer</title>
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <meta charset="utf-8">
</head>

<body>
    <?php
        include "header.php";
    ?>
    <header class="main_head">
        <h1>Car Catalog</h1>
    </header>
    <div class="searchOptions" id="searchOptions">
        <div>
            <ul id="searchButtonList">
                <li>
                    <input type="text" placeholder="Search for a specific car" id="searchBar">
                </li>
                

            </ul>
        </div>
        <div class="filter">
            <h2>Filter</h2>
            <ul class="filList">
                <li><input type="number" placeholder="Number of seats" id="numSeats"></li>
                <li>
                    <input type="radio" id="auto" name="auto_man" value="auto">
                    Automatic
                    <input type="radio" id="man" name="auto_man" value="man">
                    Manual
                </li>
                <li id="engList">
                    <input type="radio" id="petrol" name="fuel_type" value="Gasoline">Gasoline
                    <input type="radio" id="hybrid" name="fuel_type" value="Hybrid">Hybrid
                    <input type="radio" id="electric" name="fuel_type" value="Electric">Electric
                    <input type="radio" id="diesel" name="fuel_type" value="Diesel">Diesel
                </li>
            </ul>
        </div>
        <div>
            <h2>Sort By</h2>
            <select name="sort" id="sort">
                <option value="make">Make</option>
                <option value="model">Model</option>
            </select>

        </div>
        <div>
            <input type="button" id="searchButton" value="Search" >
        </div>
    </div>
    <article>
        <ul class="car_list" id="car_list"></ul>
    </article>
    <script type="text/javascript" src="./js/index.js"></script>
    <?php
        include "footer.php";
    ?>
</body>