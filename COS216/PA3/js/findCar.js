//Michael Horwitz u22512323
/*
    function submitForm(){
        var form = document.getElementById("main_form");
        form.onsubmit = function(event){
            //loadCars();
            var formData = new FormData(form);
            alert(JSON.stringify(formData.values()));
            for (const [key, value] of formData) {
                alert( `${key}: ${value}\n`);
            }
        }
    }
    submitForm();
    */
function loadCars() {
    var form = document.getElementById("main_form");

    document.getElementById("result_list").innerHTML = "";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var carResp = JSON.parse(xhttp.responseText);
            if (carResp.status === "success") {
                var carArr = carResp.data;
                for (var index = 0; index < carArr.length; index++) {
                    var car = carArr[index];
                    var resultList = document.getElementById("result_list");
                    var resultListA = document.createElement("a");
                    resultListA.setAttribute("href", "./Construction.html");
                    var resultListALi = document.createElement("li");
                    resultListALi.setAttribute("id", car.id_trim);
                    resultListALi.innerHTML = "" + car.make + " " + car.model + "<br>";
                    resultListA.appendChild(resultListALi);
                    resultList.appendChild(resultListA);
                    loadCarImg(car.make, car.model, car.id_trim);
                }
            }
        }
    }
    var sendObj = {
        "studentnum": "u22512323",
        "type": "GetAllCars",
        "limit": 8,
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "return": "*",
        "fuzzy": false
    };
    var makeOf = document.getElementById("makeOf");
    var engSelect = document.getElementById("engSelect");
    var auto = document.getElementById("auto");
    var man = document.getElementById("man");
    var numSeats = document.getElementById("numSeats");
    var numCyl = document.getElementById("numCyl");
    var bodyType = document.getElementById("bodyType");
    var makeSearch = {};
    makeSearch.make = makeOf.value;
    makeSearch.engine_type = engSelect.value;
    if (auto.checked) {
        makeSearch.transmission = "Automatic";
    } else if (man.checked) {
        makeSearch.transmission = "Manual";
    }
    makeSearch.number_of_seats = numSeats.value;
    if (numCyl.value != "") {
        makeSearch.number_of_cylinders = numCyl.value;
    }
    if (bodyType.value != "NoVal") {
        makeSearch.body_type = bodyType.value;
    }
    sendObj.search = makeSearch;
    console.log(JSON.stringify(sendObj));
    xhttp.send(JSON.stringify(sendObj));

}
loadCars();
function loadCarImg(brand, model, id_trim) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + brand + "&model=" + model);
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var resultListALi = document.getElementById("" + id_trim);
            //console.log(resultListALi);
            var resultListALiImg = document.createElement("img");
            resultListALiImg.setAttribute("src", xhttp.responseText);
            resultListALiImg.setAttribute("height", "375");
            resultListALiImg.setAttribute("alt", "Car image not found");
            resultListALi.appendChild(resultListALiImg);

        }
    }
    xhttp.send();
}
function onClick() {
    if (document.getElementById("makeOf").value === "") {
        alert("You must enter a car make");
        return;
    }
    if (document.getElementById("numSeats").value === "") {
        alert("You must enter a car make");
        return;
    }
    loadCars();
}
document.getElementById("submit").addEventListener("click", onClick);

