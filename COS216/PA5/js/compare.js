//Michael Horwitz u22512323
function loadAllCars() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var carResp = JSON.parse(xhttp.responseText);
            if (carResp.status === "success") {
                var carArr = carResp.data;
                for (var index = 0; index < carArr.length; index++) {
                    var car = carArr[index];
                    var car1 = document.getElementById("Car1Select");
                    var car2 = document.getElementById("Car2Select");
                    var car1Opt = document.createElement("option");
                    car1.innerHTML += "<option value=\"" + car.id_trim + "\">" + car.make + " " + car.model + "</option>";
                    car2.innerHTML += "<option value=\"" + car.id_trim + "\">" + car.make + " " + car.model + "</option>";
                }
            }
        }
    }
    //console.log("Sent");
    var sendObj = {
        "studentnum": "u22512323",
        "type": "GetAllCars",
        "limit": 500,
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "return": ["id_trim", "make", "model"]
    };
    xhttp.send(JSON.stringify(sendObj));

}
loadAllCars();
loadCar1(document.getElementById("Car1Select").value);
function loadCar1(id_trim) {
    //console.log("id: " + id_trim);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var carResp = JSON.parse(xhttp.responseText);
            if (carResp.status === "success") {
                var car1 = carResp.data[0];
                //console.log("car1: " + JSON.stringify(car1));
                document.getElementById("car1H2").innerHTML = car1.make + " " + car1.model;
                document.getElementById("car1Info").innerHTML = "Brand: " + car1.make + "<br>Model: " + car1.model + " <br> Number of seats: " + car1.number_of_seats + " <br> Number of Cylinders: " + car1.number_of_cylinders + " <br> Max Speed: " + car1.max_speed_km_per_h + "km/h <br> Transmission: " + car1.transmission + " <br> Engine Type: " + car1.engine_type;
                loadCar1Img(car1.id_trim, car1.make, car1.model);
            }
        }
    }
    var sendObj = {
        "studentnum": "u22512323",
        "type": "GetAllCars",
        "limit": 500,
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "return": "*",
        "fuzzy": false,
        "search": { "id_trim": id_trim }
    };

    xhttp.send(JSON.stringify(sendObj));
}
function loadCar1Img(id_trim, brand, model) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + brand + "&model=" + model);
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("car1Img").setAttribute("src", xhttp.responseText);
        }
    }
    xhttp.send();
}
function car1Event() {
    document.getElementById("Car1Select").addEventListener("change", function () { loadCar1(document.getElementById("Car1Select").value); });
}
car1Event();

loadCar2(document.getElementById("Car2Select").value);
function loadCar2(id_trim) {
    //console.log("id: " + id_trim);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var carResp = JSON.parse(xhttp.responseText);
            if (carResp.status === "success") {
                var car2 = carResp.data[0];
                //console.log("car2: " + JSON.stringify(car2));
                document.getElementById("car2H2").innerHTML = car2.make + " " + car2.model;
                document.getElementById("car2Info").innerHTML = "Brand: " + car2.make + "<br>Model: " + car2.model + " <br> Number of seats: " + car2.number_of_seats + " <br> Number of Cylinders: " + car2.number_of_cylinders + " <br> Max Speed: " + car2.max_speed_km_per_h + "km/h <br> Transmission: " + car2.transmission + " <br> Engine Type: " + car2.engine_type;
                loadCar2Img(car2.id_trim, car2.make, car2.model);
            }
        }
    }
    var sendObj = {
        "studentnum": "u22512323",
        "type": "GetAllCars",
        "limit": 500,
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "return": "*",
        "fuzzy": false,
        "search": { "id_trim": id_trim }
    };

    xhttp.send(JSON.stringify(sendObj));
}
function loadCar2Img(id_trim, brand, model) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + brand + "&model=" + model);
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("car2Img").setAttribute("src", xhttp.responseText);
        }
    }
    xhttp.send();
}
function car2Event() {
    document.getElementById("Car2Select").addEventListener("change", function () { loadCar2(document.getElementById("Car2Select").value); });
}
car2Event();