//Michael Horwitz u22512323
function loadCars() {
    const xhttp = new XMLHttpRequest();
    //xhttp.open("POST", "https://wheatley.cs.up.ac.za/api/");
    xhttp.open("POST", "/api.php/");
    //console.log("Opened");
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("BEFORE");
            console.log(xhttp.responseText);
            console.log("AFTER");
            var carResp = JSON.parse(xhttp.responseText);
            if (carResp.status === "success") {
                var carArr = carResp.data;
                for (var index = 0; index < carArr.length; index++) {
                    var car = carArr[index];

                    var carListItem = document.createElement("li");

                    var carListItemSpan = document.createElement("span");
                    carListItemSpan.setAttribute("class", "name_pic");
                    carListItemSpan.setAttribute("id", "span_" + car.id_trim);
                    var carListItemSpanHeading = document.createElement("h3")
                    carListItemSpanHeading.insertAdjacentHTML("afterbegin", car.make + " " + car.model);
                    carListItemSpan.appendChild(carListItemSpanHeading);
                    var carListItemSpanImg = document.createElement("img");
                    carListItemSpanImg.setAttribute("src", car.image);
                    carListItemSpanImg.setAttribute("height", "128");
                    carListItemSpan.appendChild(carListItemSpanImg);
                    carListItem.appendChild(carListItemSpan);
                    carListItem.setAttribute("id", car.id_trim);
                    var carListItemList = document.createElement("ul");
                    carListItemList.setAttribute("class", "car1_info");
                    var carListItemListItem = document.createElement("li");
                    carListItemList.innerHTML = "<li>Brand: " + car.make + "</li><li>Model: " + car.model + "</li><li>Body Type: " + car.body_type + "</li><li>Engine Type: " + car.engine_type + "</li><li>Seats: " + car.number_of_seats + "</li><li>Transmission: " + car.transmission + "</li>";
                    carListItem.appendChild(carListItemList);
                    carListItemList.appendChild(carListItemListItem);
                    document.getElementById("car_list").appendChild(carListItem);
                    /*
                    */
                    //loadCarImg(car.make, car.model, car.id_trim)
                }
            }
        }
    }
    //console.log("Sent");
    var sendObj = {
        "studentnum": "u22512323",
        "type": "GetAllCars",
        "limit": 20,
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "return": "*"
    };
    var searchBar = document.getElementById("searchBar");
    var auto = document.getElementById("auto");
    var man = document.getElementById("man");
    var numSeats = document.getElementById("numSeats");
    var sort = document.getElementById("sort");
    var makeSearch = {};
    if (searchBar.value != "") {
        makeSearch.make = searchBar.value;
    }
    if (auto.checked) {
        //console.log("Que");
        makeSearch.transmission = "Automatic";
        sendObj.search = makeSearch;
    } 
    if(man.checked){
        //console.log("Pesa");
        makeSearch.transmission = "Manual";
        sendObj.search = makeSearch;
    }
    var engList = document.getElementById("engList");
    //console.log(engList.childNodes);
    for (let index = 0; index < engList.childNodes.length; index++) {
        if (engList.childNodes[index].checked) {
            //console.log(index);
            makeSearch.engine_type = engList.childNodes[index].value;
        }
        //console.log(engList.childNodes[index]);
    }
    if (numSeats.value != "") {
        makeSearch.number_of_seats = numSeats.value;
    }
    if (sort.value === "make") {
        sendObj.sort = "make";
    }
    if (sort.value === "model") {
        sendObj.sort = "model";
    }
    console.log(JSON.stringify(sendObj));
    xhttp.send(JSON.stringify(sendObj));

}
loadCars();
function loadCarImg(brand, model, id_trim) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + brand + "&model=" + model);
    //console.log(retStr);
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(id_trim);
            var carListItemSpan = document.getElementById("" + id_trim).firstChild;
            //console.log("carListItemSpan: " + carListItemSpan);
            var carListItemSpanImg = document.createElement("img");
            //console.log("carListItemSpanImg: " + carListItemSpanImg);
            carListItemSpanImg.setAttribute("src", xhttp.responseText);
            carListItemSpanImg.setAttribute("height", "128");
            carListItemSpan.appendChild(carListItemSpanImg);
        }
    }
    xhttp.send();
}
function searchFunc() {
    document.getElementById("car_list").innerHTML = "";
    loadCars();
}

var searchButton = document.getElementById("searchButton");
//console.log(searchButton);
searchButton.addEventListener("click", searchFunc);
