<!--Michael Horwitz u22512323-->
<!DOCTYPE html>

<head lang="en">
    <meta charset="utf-8">
    <title>Compare</title>
    <link rel="stylesheet" type="text/css" href="./css/Compare.css">
</head>

<body>
    <?php
        include "header.php";
    ?>
    <header>
        <h1>Compare Cars</h1>
    </header>
    <article>

        <div class="compare" id="compare">
            <div class="Car1" id="Car1">
                <select id="Car1Select">
                </select>
                <h2 id="car1H2">Corolla</h2><br>
                <img id="car1Img" src="./img/Car1.png" width=500 alt="Car image not found"><br>
                <div id="car1Info">
                    Brand: Toyota <br>
                    Model: Corolla <br>
                    Year: 2022 <br>
                    Doors: 5 <br>
                    Seats: 5 <br>
                    Horsepower: 139 <br>
                    Mileage: 25 000 km
                </div>
            </div>
            <div class="Car2" id="Car2">
                <select id="Car2Select">
                </select>
                <h2 id="car2H2">Corolla</h2><br>
                <img id="car2Img" src="./img/Car2.png" width=500 alt="Car image not found"><br>
                <div id="car2Info">
                    Brand: Toyota <br>
                    Model: Corolla <br>
                    Year: 2022 <br>
                    Doors: 5 <br>
                    Seats: 5 <br>
                    Horsepower: 139 <br>
                    Mileage: 25 000 km
                </div>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="./js/compare.js"></script>
</body>